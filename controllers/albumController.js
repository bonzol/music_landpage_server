const Album = require("../models/album");
const Artist = require("../models/artist");
const Song = require("../models/song");

const functionOrders = {
  addAlbums: addAlbums,
  editAlbums: editAlbums,
  deleteAlbums: deleteAlbums,
};

exports.getAllAlbums = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      return artist.getAlbums({ include: Song });
    })
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAlbum = (req, res) => {
  Album.findByPk(req.params.albumId, { include: Song })
    .then((album) => {
      if (album.artistId != req.user.id) {
        return res.send("this album doesnt belong to this artist");
      }
      res.send(album);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addAlbum = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      artist.createAlbum({
        title: req.body.title,
        date: req.body.date,
        link: req.body.link,
        img: req.body.img,
      });
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAlbum = (req, res) => {
  Album.findByPk(req.params.albumId)
    .then((album) => {
      if (album.artistId != req.user.id) {
        return res.send("this album doesnt belong to this artist");
      }
      album.title = req.body.title;
      album.date = req.body.date;
      album.link = req.body.link;
      album.img = req.body.img;
      album.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAlbum = (req, res) => {
  Album.findByPk(req.params.albumId)
    .then((album) => {
      if (album.artistId != req.user.id) {
        return res.send("this album doesnt belong to this artist");
      }
      album.destroy();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteAlbums = (req, res) => {
  const albumsIds = req.body;
  albumsIds.forEach((albumId) => {
    Album.findByPk(albumId).then((album) => {
      if (album.artistId != req.user.id) {
        return res.send("this album doesnt belong to this artist");
      }
      album.destroy();
    });
  });
  res.status(200).send({ deleteAlbums: true });
};
exports.updateAlbums = (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    for (const order in body) {
      functionOrders[order](body[order], user);
    }
    res.status(200).send({ updateAlbums: true });
  } catch {
    res.status(400).send({ updateAlbums: false });
  }
};
function addAlbums(albums, user) {
  albums.forEach((album) => {
    Artist.findByPk(user.id)
      .then((artist) => {
        artist.createAlbum({
          title: album.title,
          date: album.date,
          link: album.link,
          img: album.img,
          songs: [...album.songs]
        }, {
          include:Song
        });
      })
      .then(() => {
        console.log("Album added");
      });
  });
}
function editAlbums(albums, user) {
  albums.forEach((album) => {
    Album.findByPk(album.id, { include: Song })
      .then((dbAlbum) => {
        if (dbAlbum == null || dbAlbum.artistId != user.id) {
          console.log(
            "this album doesnt belong to this artist or doesnt exist"
          );
          return;
        }
        dbAlbum.title = album.title;
        dbAlbum.date = album.date;
        dbAlbum.link = album.link;
        dbAlbum.img = album.img;
        if (dbAlbum.songs != undefined) {
          dbAlbum.songs.forEach((song) => {
            song.destroy();
          });
        }
        album.songs.forEach((song) => {
          dbAlbum.createSong({
            title: song.title,
          });
        });
        dbAlbum.save();
      })
      .then(() => {
        console.log("Album edited");
      });
  });
}
function deleteAlbums(albumsIds, user) {
  albumsIds.forEach((albumId) => {
    Album.findByPk(albumId)
      .then((dbAlbum) => {
        if (dbAlbum == null || dbAlbum.artistId != user.id) {
          console.log(
            "this album doesnt belong to this artist or doesnt exist"
          );
          return;
        }
        dbAlbum.destroy();
      })
      .then(() => {
        console.log("Album deleted");
      });
  });
}

const Album = require("../models/album");
const Artist = require("../models/artist");
const Link = require("../models/link");
const Song = require("../models/song");
const Text = require("../models/text");
const Video = require("../models/video");

exports.getArtist = (req, res) => {
  Artist.findByPk(req.user.id, {
    include: [
      { model: Album, include: Song },
      { model: Video },
      { model: Text },
      { model: Link },
    ],
  })
    .then((artist) => {
      if (artist.id != req.user.id) {
        res.send("this artist isnt the artist");
      }
      res.send(artist);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editArtist = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      if (artist.id != req.user.id) {
        return res.send("this artist isnt the artist");
      }
      artist.username = req.body.username;
      artist.artistname = req.body.artistname;
      artist.lang = req.body.lang;
      artist.save();
    })
    .then((result) => {
      console.log("Artist edit");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

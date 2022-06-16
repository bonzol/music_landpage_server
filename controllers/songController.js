const Album = require("../models/album");
const Song = require("../models/song");

exports.addSongs = (req, res) => {
    Album.findByPk(req.params.albumId)
    .then((album)=>{
        if(album.artistId != req.user.id) {
            return res.send('this album doesnt belong to this artist')
        }
        const songs = req.body;
        songs.forEach(song => {
            album.createSong({
                title: song
            });
        });
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.editSongs = (req, res) => {
    Album.findByPk(req.params.albumId, {include:Song})
    .then((album)=>{
        if(album.artistId != req.user.id) {
            return res.send('this album doesnt belong to this artist')
        }
        album.songs.forEach(song=>{song.destroy()})
        const newSongs = req.body;
        newSongs.forEach(song => {
            album.createSong({
                title: song
            });
        });
        })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteSong = (req, res) => {
    const songId = req.params.songId;
    Song.findByPk(songId)
    .then((song)=>{
        Album.findByPk(song.albumId)
    })
    .then((album)=>{
        if(album.artistId != req.user.id) {
            return res.send('this album doesnt belong to this artist')
        } 
        Song.findByPk(songId)
    })
    .then((song)=>{
        song.destroy();
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}
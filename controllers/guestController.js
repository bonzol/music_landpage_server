const Album = require("../models/album");
const Artist = require("../models/artist");
const Video = require("../models/video");
const Link = require("../models/link");
const Text = require("../models/text");
const Song = require("../models/song");

exports.getArtist = (req, res) => {
    Artist.findOne({where : {username : req.params.username}})
    .then((artist)=>{
        if (artist == null) return res.status(404).send('artists doesnt exist')
        return Artist.findByPk(artist.id, {include:[{model:Album, include:Song}, {model:Video}, {model:Text}, {model:Link}]})
    })
    .then((artist)=>{
        res.send(artist)
    })
    .catch(err => {
        console.log(err);
    });
}


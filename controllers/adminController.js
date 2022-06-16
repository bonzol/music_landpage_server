const Artist = require('../models/artist');

exports.getAllArtists = (req, res) => {
  Artist.findAll()
  .then(artists=>{
    res.send(artists);
  })
};
exports.getArtist = (req, res) => {
  Artist.findByPk(req.params.artistId)
  .then(artist=>{
    res.send(artist);
  })
};

exports.addArtist = (req, res) => {
  Artist.create({
    username: req.body.username,
    artistname: req.body.artistname,
    email: req.body.email,
    password: req.body.password
  })
  .then((result)=>{
    console.log('Artist created');
    res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
};

exports.editArtist = (req, res) => {
  Artist.findByPk(req.body.id)
  .then((artist)=>{
    artist.username = req.body.username;
    artist.artistname = req.body.artistname;
    artist.email = req.body.email;
    artist.save();
  })
  .then((result)=>{
    console.log('Artist edit');
    res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
};

exports.deleteArtist = (req, res) => {
  Artist.findByPk(req.params.artistId)
  .then((artist)=>{
    console.log(artist);
    artist.destroy();
  })
  .then((result)=>{
    console.log('Artist deleted');
    res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
};
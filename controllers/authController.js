const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Artist = require("../models/artist");


exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)
        return res.status(401).send('Token is missing...');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {
            return res.status(403).send('Token is not valid')
        }
        req.user = user;
        next();
    })
}

exports.authTokenAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)
        return res.status(401).send('Token is missing...');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {
            return res.status(403).send('Token is not valid')
        }
        if(user.email != process.env.ADMIN_EMAIL) {
            return res.status(403).send('user is not admin')
        }
        req.user = user;
        next();
    })
}

exports.checkEmail = async (req, res) => {
    const artist = await Artist.findOne({ where: { email: req.body.email } })
    if(artist != null) {
        res.send(true)
    } else {
        res.send(false)
    }
}

exports.checkUsername = async (req, res) => {
  const artist = await Artist.findOne({ where: { username: req.body.username } });
  if (artist != null) {
    res.send(true);
  } else {
    res.send(false);
  }
};

exports.signUp = async (req, res) => {
    const artistEmail = await Artist.findOne({ where: { email: req.body.email } })
    if(artistEmail != null) {
        return res.send('Email already exist')
    }
    const artistUsername = await Artist.findOne({ where: { username: req.body.username } })
    if(artistUsername != null) {
        return res.send('Username already exist')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    Artist.create({
        username: req.body.username,
        artistname: req.body.artistname,
        email: req.body.email,
        password: hashedPassword
      })
      .then((result)=>{
        console.log('Artist created');
        res.send(result)
      })
      .catch(err => {
        console.log(err);
      });
}
exports.logIn = async (req, res) => {
    const artist = await Artist.findOne({ where: { email: req.body.email } })
    if (artist == null) {
        return res.send('Cannot find user, email doesnt exist')
    }
    try {
        if( await bcrypt.compare(req.body.password, artist.password)) {
            const user = {email: req.body.email, id: artist.id};
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'168h'})
            res.send({accessToken: accessToken, username: artist.username}) 
        } else {
            res.send('Not Allowed, password is wrong')
        }

    } catch {
        res.status(500).send();
    }
}

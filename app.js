require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');


const Artist = require('./models/artist');
const Text = require('./models/text');
const Album = require('./models/album');
const Song = require('./models/song');
const Link = require('./models/link');
const Video = require('./models/video');
const sequelize = require('./util/database');

const app = express();

const adminRoutes = require('./routes/adminRouter');
const artistRoutes = require('./routes/artistRouter');
const authRoutes = require('./routes/authRouter');
const guestRoutes = require('./routes/guestRouter');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use('/admin', adminRoutes);
app.use('/artist', artistRoutes);
app.use('/auth', authRoutes);
app.use('/', guestRoutes);

Artist.hasMany(Text);
Text.belongsTo(Artist);
Artist.hasMany(Album);
Album.belongsTo(Artist);
Album.hasMany(Song);
Song.belongsTo(Album);
Artist.hasMany(Link);
Link.belongsTo(Artist);
Artist.hasMany(Video);
Video.belongsTo(Artist);

sequelize
// .sync({force:true})
.sync()
.then(() => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});

const Artist = require("../models/artist");
const Video = require("../models/video");

const functionOrders = {
  addVideos: addVideos,
  editVideos: editVideos,
  deleteVideos: deleteVideos,
};

exports.getAllVideos = (req, res) => {
    Artist.findByPk(req.user.id)
    .then((artist)=>{
        return artist.getVideos();
    })
    .then((videos)=>{
        res.send(videos);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getVideo = (req, res) => {
    Video.findByPk(req.params.videoId)
    .then((video)=>{
        if(video.artistId != req.user.id) {
            return res.send('this video doesnt belong to this artist')
        }
            res.send(video)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.addVideo = (req, res) => {
    Artist.findByPk(req.user.id)
    .then((artist)=>{
    artist.createVideo({
        title: req.body.title,
        source: req.body.source
    })
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.editVideo = (req, res) => {
    Video.findByPk(req.params.videoId)
    .then((video)=>{
        if(video.artistId != req.user.id) {
            return res.send('this video doesnt belong to this artist')
        }
        video.title = req.body.title;
        video.source = req.body.source;
        video.save();
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteVideo = (req, res) => {
    Video.findByPk(req.params.videoId)
    .then((video)=>{
        if(video.artistId != req.user.id) {
            return res.send('this video doesnt belong to this artist')
        }
        video.destroy();
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(err => {
        console.log(err);
    });
}
exports.updateVideos = (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    for (const order in body) {
      functionOrders[order](body[order], user);
    }
    res.status(200).send({ updateVideos: true });
  } catch {
    res.status(400).send({ updateVideos: false });
  }
};

function addVideos(videos, user) {
  videos.forEach((video) => {
    Artist.findByPk(user.id)
      .then((artist) => {
        artist.createVideo({
          title: video.title,
          source: video.source,
        });
      })
      .then(() => {
        console.log("video Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function editVideos(videos, user) {
  videos.forEach((video) => {
    Video.findByPk(video.id)
      .then((receivedVideo) => {
        if (receivedVideo.artistId != user.id) {
          console.log("this video doesnt belong to this artist");
          return;
        }
            receivedVideo.title = video.title;
            receivedVideo.source = video.source;
            receivedVideo.save();
      })
      .then(() => {
        console.log("video Edited");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function deleteVideos(videosIds, user) {
  videosIds.forEach((videoId) => {
    Video.findByPk(videoId)
      .then((receivedVideo) => {
        if (receivedVideo.artistId != user.id) {
          console.log("this video doesnt belong to this artist");
          return;
        }
        receivedVideo.destroy();
      })
      .then(() => {
        console.log("video Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const express = require("express");

const artistController = require("../controllers/artistController");
const albumController = require("../controllers/albumController");
const songController = require("../controllers/songController");
const authController = require("../controllers/authController");
const videoController = require("../controllers/videoController");
const linkController = require("../controllers/linkController");
const textController = require("../controllers/textController");

const router = express.Router();

router.get("/artist", authController.authToken, artistController.getArtist);
router.put(
  "/edit-artist",
  authController.authToken,
  artistController.editArtist
);

router.get("/albums", authController.authToken, albumController.getAllAlbums);
router.get(
  "/album/:albumId",
  authController.authToken,
  albumController.getAlbum
);
router.post("/add-album", authController.authToken, albumController.addAlbum);
router.post(
  "/update-albums",
  authController.authToken,
  albumController.updateAlbums
);
router.put(
  "/edit-album/:albumId",
  authController.authToken,
  albumController.editAlbum
);
router.delete(
  "/delete-album/:albumId",
  authController.authToken,
  albumController.deleteAlbum
);
router.post(
  "/delete-albums",
  authController.authToken,
  albumController.deleteAlbums
);

router.post(
  "/add-songs/:albumId",
  authController.authToken,
  songController.addSongs
);
router.put(
  "/edit-songs/:albumId",
  authController.authToken,
  songController.editSongs
);
router.delete(
  "/delete-song/:songId",
  authController.authToken,
  songController.deleteSong
);

router.get("/videos", authController.authToken, videoController.getAllVideos);
router.get(
  "/video/:videoId",
  authController.authToken,
  videoController.getVideo
);
router.post("/add-video", authController.authToken, videoController.addVideo);
router.post("/update-videos", authController.authToken, videoController.updateVideos);
router.put(
  "/edit-video/:videoId",
  authController.authToken,
  videoController.editVideo
);
router.delete(
  "/delete-video/:videoId",
  authController.authToken,
  videoController.deleteVideo
);

router.get("/links", authController.authToken, linkController.getAllLinks);
router.get("/link/:linkId", authController.authToken, linkController.getLink);
router.post("/add-link", authController.authToken, linkController.addLink);
router.post(
  "/update-links",
  authController.authToken,
  linkController.updateLinks
);
router.put(
  "/edit-link/:linkId",
  authController.authToken,
  linkController.editLink
);
router.delete(
  "/delete-link/:linkId",
  authController.authToken,
  linkController.deleteLink
);

router.get("/texts", authController.authToken, textController.getAllTexts);
router.get("/text/:textId", authController.authToken, textController.getText);
router.post("/add-text", authController.authToken, textController.addText);
router.post(
  "/update-texts",
  authController.authToken,
  textController.updateTexts
);

router.put(
  "/edit-text/:textId",
  authController.authToken,
  textController.editText
);
router.delete(
  "/delete-text/:textId",
  authController.authToken,
  textController.deleteText
);

module.exports = router;

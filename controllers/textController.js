const Artist = require("../models/artist");
const Text = require("../models/text");

const functionOrders = {
  addTexts: addTexts,
  editTexts: editTexts,
  deleteTexts: deleteTexts,
};

exports.getAllTexts = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      return artist.getTexts();
    })
    .then((text) => {
      res.send(text);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getText = (req, res) => {
  Text.findByPk(req.params.textId)
    .then((text) => {
      if (text.artistId != req.user.id) {
        return res.send("this text doesnt belong to this artist");
      }
      res.send(text);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addText = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      artist.createText({
        paragraph: req.body.paragraph,
        placement: req.body.placement,
      });
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
function addTexts(texts, user) {
  texts.forEach((text) => {
    Artist.findByPk(user.id)
      .then((artist) => {
        artist.createText({
          paragraph: text.paragraph,
          placement: text.placement,
        });
      })
      .then(() => {
        console.log("Text Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function editTexts(texts, user) {
  texts.forEach((text) => {
    Text.findByPk(text.id)
      .then((receivedText) => {
        if (receivedText.artistId != user.id) {
          console.log("this text doesnt belong to this artist");
          return;
        }
        receivedText.paragraph = text.paragraph;
        receivedText.placement = text.placement;
        receivedText.save();
      })
      .then(() => {
        console.log("Text Edited");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function deleteTexts(textsIds, user) {
  textsIds.forEach((textId) => {
    Text.findByPk(textId)
      .then((recievedText) => {
        if (recievedText.artistId != user.id) {
          console.log("this text doesnt belong to this artist");
          return;
        }
        recievedText.destroy();
      })
      .then(() => {
        console.log("Text Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

exports.editText = (req, res) => {
  Text.findByPk(req.params.textId)
    .then((text) => {
      if (text.artistId != req.user.id) {
        return res.send("this text doesnt belong to this artist");
      }
      text.paragraph = req.body.paragraph;
      text.placement = req.body.placement;
      text.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteText = (req, res) => {
  Text.findByPk(req.params.textId)
    .then((text) => {
      if (text.artistId != req.user.id) {
        return res.send("this text doesnt belong to this artist");
      }
      text.destroy();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.updateTexts = (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    for (const order in body) {
      functionOrders[order](body[order], user);
    }
    res.status(200).send({ updateTexts: true });
  } catch {
    res.status(400).send({ updateTexts: false });
  }
};

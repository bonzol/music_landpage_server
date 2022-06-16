const Artist = require("../models/artist");
const Link = require("../models/link");

const functionOrders = {
  addLinks: addLinks,
  editLinks: editLinks,
  deleteLinks: deleteLinks,
};

exports.getAllLinks = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      return artist.getLinks();
    })
    .then((link) => {
      res.send(link);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLink = (req, res) => {
  Link.findByPk(req.params.linkId)
    .then((link) => {
      if (link.artistId != req.user.id) {
        return res.send("this link doesnt belong to this artist");
      }
      res.send(link);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addLink = (req, res) => {
  Artist.findByPk(req.user.id)
    .then((artist) => {
      artist.createLink({
        link: req.body.link,
        company: req.body.company,
        title: req.body.title,
      });
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editLink = (req, res) => {
  Link.findByPk(req.params.linkId)
    .then((link) => {
      if (link.artistId != req.user.id) {
        return res.send("this link doesnt belong to this artist");
      }
      link.link = req.body.link;
      link.company = req.body.company;
      link.title = req.body.title;
      link.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteLink = (req, res) => {
  Link.findByPk(req.params.linkId)
    .then((link) => {
      if (link.artistId != req.user.id) {
        return res.send("this link doesnt belong to this artist");
      }
      link.destroy();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.updateLinks = (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    for (const order in body) {
      functionOrders[order](body[order], user);
    }
    res.status(200).send({ updateLinks: true });
  } catch {
    res.status(400).send({ updateLinks: false });
  }
};
function addLinks(links, user) {
  links.forEach((link) => {
    Artist.findByPk(user.id)
      .then((artist) => {
        artist.createLink({
          link: link.link,
          company: link.company,
          title: link.title,
        });
      })
      .then(() => {
        console.log("link Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function editLinks(links, user) {
  links.forEach((link) => {
    Link.findByPk(link.id)
      .then((receivedLink) => {
        if (receivedLink.artistId != user.id) {
          console.log("this link doesnt belong to this artist");
          return;
        }
        receivedLink.link = link.link;
        receivedLink.company = link.company;
        receivedLink.title = link.title;
        receivedLink.save();
      })
      .then(() => {
        console.log("link Edited");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function deleteLinks(linksIds, user) {
  linksIds.forEach((linkId) => {
    Link.findByPk(linkId)
      .then((receivedLink) => {
        if (receivedLink.artistId != user.id) {
          console.log("this link doesnt belong to this artist");
          return;
        }
        receivedLink.destroy();
      })
      .then(() => {
        console.log("link Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

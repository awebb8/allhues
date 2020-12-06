const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/api/videouploads", (req, res) => {
  db.ContentCreator.find({})
    .populate("kits")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/kits", (req, res) => {
  db.Kit.find({})
    .populate("kits")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/kits/:id", (req, res) => {
  let id = req.params.id;
  db.Kit.findById(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/videouploads", (req, res) => {
  db.ContentCreator.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/user", auth, (req, res) => {
  db.ContentCreator.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/users/:id", (req, res) => {
  db.ContentCreator.find({ _id: req.params.id })
    .populate("kits")
    .populate("favorites")
    // .populate("sentMessages")
    // .populate("receivedMessages")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/messages/:id", (req, res) => {
  db.ContentCreator.find({ _id: req.params.id })
    .populate("sentMessages")
    .populate("receivedMessages")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/users", ({ body }, res) => {
  db.ContentCreator.create(body)
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//CHanging pictures route
router.put("/api/users/:id", (req, res) => {
  db.ContentCreator.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/kits/:id", (req, res) => {
  // console.log(req.body);
  db.Kit.create(req.body)
    .then((item) =>
      db.ContentCreator.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { kits: item._id } },
        { new: true }
      )
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/user/:id", (req, res) => {
  // console.log(req.body)
  db.ContentCreator.findByIdAndUpdate(
    req.params.id,
    { $set: { favorites: req.body } },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/kits/:id", (req, res) => {
  db.Kit.findByIdAndDelete(req.params.id)
    .then((kit) => {
      res.json(kit);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Update a kit
router.put("/api/kits/:id", (req, res) => {
  db.Kit.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((kit) => {
      res.json(kit);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/vidtokit/:id", (req, res) => {
  console.log(req.body);
  db.Kit.findByIdAndUpdate(req.params.id, {
    $push: { videoUrl: req.body },
  })
    .then((kit) => res.json(kit))
    .catch((err) => res.status(400).json(err));
});

router.put("/api/kits/uniquevisits/:id", (req, res) => {
  db.Kit.findByIdAndUpdate(req.params.id, { $inc: { uniqueVisits: 1 } })
    .then((kit) => {
      res.json(kit);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/kits/affiliatelink/:id", (req, res) => {
  db.Kit.updateOne(
    {
      "kitItems._id": req.params.id,
    },
    {
      $inc: { "kitItems.$.linkClicks": 1 },
    }
  )
    .then((kit) => {
      res.json(kit);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/users/videouploads/:id", (req, res) => {
  // console.log(req.body);
  db.ContentCreator.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        videos: req.body,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/picuploads/:id", (req, res) => {
  // console.log("new one");
  // console.log(req.body);
  db.Kit.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        imageUrl: req.body,
      },
    },
    { new: true }
  )
    .then((updatedKit) => {
      res.json(updatedKit);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/follow/:id", (req, res) => {
  // console.log(req.body);
  db.ContentCreator.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        following: req.body,
      },
      // $push: req.body,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/unfollow/:id", (req, res) => {
  // console.log(req.body);
  db.ContentCreator.updateOne(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        following: req.body,
      },
      // $push: req.body,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/followers/:id", (req, res) => {
  // console.log(req.body);
  db.ContentCreator.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        followers: req.body,
      },
      // $push: req.body,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/unfollowers/:id", (req, res) => {
  // console.log(req.body);
  db.ContentCreator.updateOne(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        followers: req.body,
      },
      // $push: req.body,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/sentmessage/:id", (req, res) => {
  // console.log(req.body);
  db.SentMessage.create(req.body)
    .then((item) =>
      db.ContentCreator.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { sentMessages: item._id } },
        { new: true }
      )
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/receivedmessage/:id", (req, res) => {
  // console.log(req.body);
  db.ReceivedMessage.create(req.body)
    .then((item) =>
      db.ContentCreator.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { receivedMessages: item._id } },
        { new: true }
      )
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/sentmessages/:id", (req, res) => {
  db.SentMessage.findByIdAndDelete(req.params.id)
    .then((deletedMsg) => {
      res.json(deletedMsg);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/receivedmessages/:id", (req, res) => {
  db.ReceivedMessage.findByIdAndDelete(req.params.id)
    .then((deletedMsg) => {
      res.json(deletedMsg);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/finduser/:name", (req, res) => {
  db.ContentCreator.findOne({ userName: req.params.name })
    .then((found) => {
      res.json(found);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

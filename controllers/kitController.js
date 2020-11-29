const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

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

// router.get("/api/kits/user", auth, (req, res) => {
//   res.json(req.user);
// });

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
  db.ContentCreator.findByIdAndUpdate(
    req.params.id,
    { $push: { videos: req.body } },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;

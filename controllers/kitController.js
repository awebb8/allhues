const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/api/kits", auth, (req, res) => {
  db.Kit.find({})
    .populate("kits")
    .then((found) => {
      res.json(found);
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
    .then((user) => res.json(user));
});

//FIXME: beware until frontend is tied you cant go here unless you delete 'auth'
router.get("/api/users/:id", (req, res) => {
  db.ContentCreator.find({_id: req.params.id})
    .populate("kits")
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/api/kits/:id", (req, res) => {
  let id = req.params.id;
  db.Kit.findByIdAndDelete(id).then((deletedUser) => {
    res.json(deletedUser);
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

router.delete("/api/kits/:id", (req, res) => {
  db.Kit.findByIdAndDelete(req.params.id).then((kit) => {
    res.json(kit);
  });
});

//TODO: haven't tested this yet and i dont think it works
router.put("/api/kits/:id", (req, res) => {
  db.Kit.findByIdAndUpdate(req.params.id).then((kit) => {
    res.json(kit);
  });
});

module.exports = router;

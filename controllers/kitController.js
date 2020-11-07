const router = require("express").Router();
const db = require("../models");

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

router.get("/api/users", (req, res) => {
  db.ContentCreator.find({})
    .populate("kits")
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

router.post("/api/kits", ({ body }, res) => {
  db.Kit.create(body)
    .then((item) =>
      db.ContentCreator.findOneAndUpdate(
        { _id: "5fa59e42442e847c7ae34ae2" },
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

router.put("/api/kits/:id", (req, res) => {
  db.Kit.findByIdAndUpdate(req.params.id).then((kit) => {
    res.json(kit);
  });
});

module.exports = router;

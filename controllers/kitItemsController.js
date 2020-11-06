const router = require("express").Router();
const db = require("../models");

router.get("/api/kititems", (req, res) => {
  db.KitItems.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/kititems", ({ body }, res) => {
  db.KitItems.create(body)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.put("/api/kititems", (req, res) => {
//   db.KitItems.findByIdAndUpdate();
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then((dbTransaction) => {
//       res.json(dbTransaction);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/transaction", (req, res) => {
//   Transaction.find({})
//     .sort({ date: -1 })
//     .then((dbTransaction) => {
//       res.json(dbTransaction);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;

const express = require("express");
const SliderCard = require("../models/SliderCard");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const list = await SliderCard.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

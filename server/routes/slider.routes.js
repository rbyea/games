const express = require("express");
const Slider = require("../models/Slider");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const list = await Slider.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newItem = await Slider.create({
      ...req.body,
    });
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const updateSlider = await Slider.findByIdAndUpdate(
      req.body._id,
      req.body,
      {
        new: true,
      }
    );
    res.send(updateSlider);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:slideId", async (req, res) => {
  try {
    await Slider.deleteOne({ _id: req.params.slideId });
    res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

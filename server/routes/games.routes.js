const express = require("express");
const Games = require("../models/Games");
const SliderCard = require("../models/SliderCard");
const Specification = require("../models/Specification");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
  try {
    const { categories, minPrice, maxPrice } = req.query;

    let query = Games.find();

    // Применение фильтра по категории
    if (categories && Object.values(categories).includes(true)) {
      const categoryIds = Object.keys(categories).filter(
        (key) => categories[key] === true
      );
      query = query.where("categories").in(categoryIds);
    }

    // Применение фильтра по диапазону цен
    if (minPrice && maxPrice) {
      query = query.where("price").gte(minPrice).lte(maxPrice);
    } else if (minPrice) {
      query = query.where("price").gte(minPrice);
    } else if (maxPrice) {
      query = query.where("price").lte(maxPrice);
    }

    const list = await query.exec();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  try {
    const newItem = await Games.create({
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      series: req.body.series,
      video: req.body.video,
      language: req.body.language,
      receipts: req.body.receipts,
      work: req.body.work,
      data: req.body.data,
      developer: req.body.developer,
      description: req.body.description,
      picture: req.body.picture,
      categories: req.body.categories,
      features: req.body.features,
      topSales: req.body.topSales,
    });

    await SliderCard.create({
      images: req.body.images,
      gameId: newItem._id,
    });

    await Specification.create({
      cpu: req.body.cpu,
      gpu: req.body.gpu,
      directx: req.body.directx,
      system: req.body.system,
      size: req.body.size,
      ram: req.body.ram,
      gameId: newItem._id,
    });

    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const updateGame = await Games.findOneAndReplace(
      { _id: req.body._id },
      {
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        series: req.body.series,
        video: req.body.video,
        language: req.body.language,
        work: req.body.work,
        data: req.body.data,
        receipts: req.body.receipts,
        developer: req.body.developer,
        description: req.body.description,
        picture: req.body.picture,
        categories: req.body.categories,
        features: req.body.features,
        topSales: req.body.topSales,
      },
      {
        new: true,
      }
    );

    await SliderCard.findOneAndUpdate(
      { gameId: req.body._id },
      {
        images: req.body.images,
      },
      {
        new: true,
      }
    );

    await Specification.findOneAndUpdate(
      { gameId: req.body._id },
      {
        cpu: req.body.cpu,
        gpu: req.body.gpu,
        directx: req.body.directx,
        system: req.body.system,
        size: req.body.size,
        ram: req.body.ram,
      },
      {
        new: true,
      }
    );

    res.send(updateGame);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
      error: error.message,
    });
  }
});

router.delete("/:gameId", auth, async (req, res) => {
  try {
    const gameId = req.params.gameId;
    await Games.deleteMany({ _id: gameId });
    await SliderCard.deleteMany({ gameId: gameId });
    await Specification.deleteMany({ gameId: gameId });
    res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

const featuresMock = require("../mockData/features.json");
const categoriesMock = require("../mockData/categories.json");
const sliderMock = require("../mockData/slider.json");
const gamesMock = require("../mockData/games.json");
const sliderCardMock = require("../mockData/sliderCard.json");
const specificationMock = require("../mockData/specification.json");

const Games = require("../models/Games");
const Features = require("../models/Features");
const Categories = require("../models/Categories");
const Slider = require("../models/Slider");
const SliderCard = require("../models/SliderCard");
const Specification = require("../models/Specification");

module.exports = async () => {
  const features = await Features.find();
  const categories = await Categories.find();
  const slider = await Slider.find();
  const games = await Games.find();
  const sliderCard = await SliderCard.find();
  const specification = await Specification.find();

  if (features.length !== featuresMock.length) {
    await createInitialEntity(Features, featuresMock);
  }
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Categories, categoriesMock);
  }
  if (slider.length !== sliderMock.length) {
    await createInitialEntity(Slider, sliderMock);
  }
  if (games.length !== gamesMock.length) {
    await createInitialEntity(Games, gamesMock);
  }
  if (sliderCard.length !== sliderCardMock.length) {
    await createInitialEntity(SliderCard, sliderCardMock);
  }
  if (specification.length !== specificationMock.length) {
    await createInitialEntity(Specification, specificationMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

import httpService from "../services/http.services";
import games from "../mockData/games.json";
import features from "../mockData/features.json";
import categories from "../mockData/categories.json";
import mainSlider from "../mockData/mainSlider.json";
import specifications from "../mockData/specification.json";
import sliderCard from "../mockData/sliderCard.json";

const useMockData = () => {
  async function initialData() {
    try {
      for (const game of games) {
        await httpService.put("games/" + game._id, game);
      }
      for (const feature of features) {
        await httpService.put("features/" + feature._id, feature);
      }
      for (const category of categories) {
        await httpService.put("categories/" + category._id, category);
      }
      for (const slide of mainSlider) {
        await httpService.put("slider/" + slide._id, slide);
      }
      for (const specification of specifications) {
        await httpService.put(
          "specifications/" + specification._id,
          specification
        );
      }
      for (const sliderGame of sliderCard) {
        await httpService.put("sliderCard/" + sliderGame._id, sliderGame);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { initialData };
};

export default useMockData;

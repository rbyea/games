import httpService from "./http.service";
const sliderCardEndpoint = "sliderCard/";

const sliderCardServices = {
  get: async () => {
    const { data } = await httpService.get(sliderCardEndpoint);
    return data;
  }
};

export default sliderCardServices;

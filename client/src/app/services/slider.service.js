import httpService from "./http.service";
const sliderEndpoint = "slider/";

const sliderServices = {
  get: async () => {
    const { data } = await httpService.get(sliderEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(sliderEndpoint, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(sliderEndpoint, payload);
    return data;
  },
  delete: async (slideId) => {
    const { data } = await httpService.delete(sliderEndpoint + slideId);
    return data;
  }
};

export default sliderServices;

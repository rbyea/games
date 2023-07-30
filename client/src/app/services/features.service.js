import httpService from "./http.service";
const featuresEndpoint = "features/";

const featuresService = {
  get: async () => {
    const { data } = await httpService.get(featuresEndpoint);
    return data;
  }
};
export default featuresService;

import httpService from "./http.service";
const specificationsEndpoint = "specifications/";

const specificationsServices = {
  get: async () => {
    const { data } = await httpService.get(specificationsEndpoint);
    return data;
  }
};

export default specificationsServices;

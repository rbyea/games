import httpService from "./http.service";
const categoryEndpoint = "categories/";

const categoryService = {
  get: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    return data;
  }
};
export default categoryService;

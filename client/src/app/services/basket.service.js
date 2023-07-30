import httpService from "./http.service";
const basketEndPoint = "basket/";

const basketService = {
  create: async (payload) => {
    const { data } = await httpService.post(basketEndPoint, payload);
    return data;
  },
  getBasketGames: async (userId) => {
    const { data } = await httpService.get(basketEndPoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`
      }
    });
    return data;
  },
  updateBasket: async (payload) => {
    const { data } = await httpService.patch(basketEndPoint, payload);
    return data;
  },
  removeGame: async (payload) => {
    const { data } = await httpService.delete(basketEndPoint + payload._id);
    return data;
  },
  removeAllGame: async (userId) => {
    const { data } = await httpService.delete(basketEndPoint, userId);
    return data;
  }
};

export default basketService;

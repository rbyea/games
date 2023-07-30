import httpService from "./http.service";
const favoriteEndPoint = "favorite/";

const favoriteService = {
  create: async (payload) => {
    const { data } = await httpService.post(favoriteEndPoint, payload);
    return data;
  },
  getFavoriteGames: async (userId) => {
    const { data } = await httpService.get(favoriteEndPoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`
      }
    });
    return data;
  },
  deleteFavorite: async (favoriteId) => {
    const { data } = await httpService.delete(favoriteEndPoint + favoriteId);
    return data;
  }
};

export default favoriteService;

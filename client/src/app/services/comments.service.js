import httpService from "./http.service";
const commentsEndPoint = "comments/";

const commentsService = {
  create: async (payload) => {
    const { data } = await httpService.post(commentsEndPoint, payload);
    return data;
  },
  getCommentsGames: async (gameId) => {
    const { data } = await httpService.get(commentsEndPoint, {
      params: {
        orderBy: "gameId",
        equalTo: `${gameId}`
      }
    });
    return data;
  },
  deleteComment: async (commentsId) => {
    const { data } = await httpService.delete(commentsEndPoint + commentsId);
    return data;
  }
};

export default commentsService;

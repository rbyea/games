import httpService from "./http.service";
const paymentEndPoint = "payment/";

const paymentService = {
  create: async (payload) => {
    const { data } = await httpService.post(paymentEndPoint, payload);
    return data;
  },
  getPayment: async (userId) => {
    const { data } = await httpService.get(paymentEndPoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`
      }
    });
    return data;
  },
  getAllPayments: async () => {
    const { data } = await httpService.get(paymentEndPoint);
    return data;
  }
};

export default paymentService;

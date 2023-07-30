import React from "react";
import { useSelector } from "react-redux";
import { getListPayment } from "../../../store/paymentSlice";
import useCopyToClipboard from "../../../hook/useCopyToClipboard";

const UserPage = (props) => {
  const paymentList = useSelector(getListPayment());
  const { copy } = useCopyToClipboard();

  const copyText = (text) => {
    copy(text);
  };

  return (
    <div className="card">
      <div className="card-body">
        {paymentList.length === 0 ? (
          <h5 className="card-title mb-0">Вы еще не совершали покупок</h5>
        ) : (
          <>
            <h5 className="card-title mb-2">Ваши заказы:</h5>
            <div className="wrapper-collumn">
              {paymentList.map((payment) => (
                <div key={payment._id} className="paymentList">
                  <div className="paymentNumber">
                    Номер заказа:
                    <span className="paymentColor">#{payment._id}</span>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-light ml-auto"
                      onClick={() => copyText(payment._id)}
                    >
                      скопировать
                    </a>
                  </div>
                  <div className="underWrap">
                    <div className="totalPrice">
                      Сумма заказа:
                      <span className="paymentColor">
                        {payment.totalPrice}р.
                      </span>
                    </div>
                    <div className="paymentStatus">
                      Статус заказа:
                      <span className="paymentColor">ожидание</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;

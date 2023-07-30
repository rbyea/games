import React from "react";
import PropTypes from "prop-types";
import InputField from "../form/inputField";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../../store/paymentSlice";
import {
  getGamesId,
  getTotalPrice,
  removeAllGame
} from "../../../store/basketSlice";
import {
  getCurrentUser,
  getCurrentUserId,
  getLoadingUsersStatus
} from "../../../store/usersSlice";
import history from "../../../utils/history";
import Preloader from "../preloader/preloader";

const PopupPayment = ({ title, visibleModal, setVisibleModal }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    setVisibleModal(false);
  };
  const listGamesId = useSelector(getGamesId);
  const currentUserId = useSelector(getCurrentUserId());
  const currentUser = useSelector(getCurrentUser(currentUserId));
  const userLoading = useSelector(getLoadingUsersStatus());
  const totalPrice = useSelector(getTotalPrice());
  const [error, setError] = React.useState({});

  const [data, setData] = React.useState({
    games: listGamesId,
    userId: currentUserId,
    email: currentUser.email || "",
    name: currentUser.name || ""
  });

  React.useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      totalPrice: totalPrice
    }));
  }, [totalPrice]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения!"
      },
      isEmail: {
        message: "Почта введена некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязателена для заполнения!"
      }
    }
  };

  React.useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(error).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    dispatch(createPayment(data));
    setVisibleModal(false);
    history.push(`/account/${currentUserId}`);
    dispatch(removeAllGame(currentUserId));
  };

  if (userLoading) return <Preloader />;

  return (
    <div className={`modal ${visibleModal ? "show" : ""}`} id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">
            <div>
              <InputField
                type="text"
                value={data.name}
                error={error.name}
                title="Имя"
                name="name"
                onChange={handleChange}
              />
              <InputField
                type="email"
                value={data.email}
                error={error.email}
                title="Почта"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              data-dismiss="modal"
            >
              Закрыть
            </button>

            <button
              disabled={!isValid}
              className="btn btn-primary"
              onClick={(e) => onSubmitForm(e)}
            >
              Оплатить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupPayment.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func,
  title: PropTypes.string
};

export default PopupPayment;

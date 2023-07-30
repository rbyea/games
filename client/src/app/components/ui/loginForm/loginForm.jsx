import React from "react";
// import styles from "./Registration.module.scss";
import InputField from "../form/inputField";
import { validator } from "../../../utils/validator";
import {
  getLoadingForm,
  getLoginAuthError,
  login
} from "../../../store/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../preloader/preloader";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const loadingJoin = useSelector(getLoadingForm());
  const enterError = useSelector(getLoginAuthError());
  const [data, setData] = React.useState({
    password: "",
    email: ""
  });
  const [error, setError] = React.useState({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения!"
      },
      isEmail: {
        message: "Почта введена некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения!"
      }
    }
  };

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
    const redirect = "/";

    const isValid = validate();

    if (!isValid) return;

    dispatch(login({ payload: data, redirect }));
  };

  return (
    <>
      {loadingJoin && <Preloader />}

      <form onSubmit={onSubmitForm}>
        <InputField
          error={error.email}
          type="email"
          title="Почта"
          value={data.email}
          name="email"
          onChange={handleChange}
        />
        <InputField
          error={error.password}
          type="password"
          title="Пароль"
          value={data.password}
          name="password"
          onChange={handleChange}
        />
        {enterError && <p className="errorAuth">{enterError}</p>}

        <div className="text-center mt-3 border-bottom">
          <button
            disabled={!isValid}
            className="btn btn-warning btn-lg btn-block"
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

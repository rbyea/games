import React from "react";
import InputField from "../form/inputField";
import CheckBoxField from "../form/checkboxField";
import { Link } from "react-router-dom";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingForm, signUp } from "../../../store/usersSlice";
import Preloader from "../preloader/preloader";

const RegistrationForm = (props) => {
  const dispatch = useDispatch();
  const loadingRegistration = useSelector(getLoadingForm());
  const [data, setData] = React.useState({
    name: "",
    password: "",
    email: "",
    license: false,
    isAdmin: false
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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения!"
      },
      min: {
        message: "Имя должено состоять минимум из 3 символов",
        value: 3
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения!"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглвную букву!"
      },

      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число!"
      },

      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения!"
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
    const isValid = validate();
    if (!isValid) return;
    const redirect = "/";

    dispatch(signUp({ payload: data, redirect }));
  };

  return (
    <>
      {loadingRegistration && <Preloader />}

      <form onSubmit={onSubmitForm}>
        <InputField
          error={error.name}
          type="text"
          title="Имя"
          value={data.name}
          name="name"
          onChange={handleChange}
        />
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

        <CheckBoxField
          error={error.license}
          value={data.license}
          name="license"
          onChange={handleChange}
        >
          Я ознакомлен с <Link to="/license">пользовательским соглашением</Link>{" "}
          и даю согласие на обработку
          <Link to="/personal-data">персональных данных</Link>
        </CheckBoxField>

        <div className="text-center mt-3 border-bottom">
          <button
            disabled={!isValid}
            className="btn btn-warning btn-lg btn-block"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;

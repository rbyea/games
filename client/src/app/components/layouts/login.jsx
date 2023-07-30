import React from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../ui/loginForm/loginForm";
import LogoJSHOP from "../../assets/logo.svg";
import RegistrationForm from "../ui/RegistrationForm/registrationForm";

const Login = (props) => {
  const { type } = useParams();

  const [formType, setFormType] = React.useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="col-lg-5 mx-auto mt-5 mb-5">
      <div className="osahan-login p-5 bg-dark">
        <div className="text-center mb-4">
          <Link to="/" className="mb-3 d-flex justify-content-center">
            <img src={LogoJSHOP} alt="" />
          </Link>
          <h5 className="font-weight-bold">
            {formType === "register"
              ? "Создание аккаунта в JSHOP"
              : "Войти в систему JSHOP"}
          </h5>
        </div>

        {formType === "register" ? <RegistrationForm /> : <LoginForm />}
        <div className="text-center mt-3 border-bottom pb-3">
          <p className="small text-muted">
            {formType === "register"
              ? "Или войдите в систему"
              : "Или зарегистрируйтесь в системе"}
          </p>
          <a
            onClick={toggleFormType}
            className="btn btn-outline-facebook bg-dark-2 btn-block"
          >
            <i className="feather-facebook"></i>{" "}
            {formType === "register" ? "Войти" : "Регистрация"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

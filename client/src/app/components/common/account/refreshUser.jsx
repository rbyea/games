import React from "react";
import InputField from "../../ui/form/inputField";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentUser,
  getLoadingUsersStatus,
  updateUser
} from "../../../store/usersSlice";
import { validator } from "../../../utils/validator";
import Preloader from "../../ui/preloader/preloader";
import { toast } from "react-toastify";

const RefreshUser = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = React.useState({});
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUser(userId));
  const loadingUsersStatus = useSelector(getLoadingUsersStatus());

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

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(error).length === 0;

  React.useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  React.useEffect(() => {
    if (!loadingUsersStatus) {
      setData({
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password
      });
    }
  }, [currentUser, loadingUsersStatus]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const redirect = `/account/${userId}`;
    dispatch(
      updateUser({
        payload: {
          ...data
        },
        redirect
      })
    );

    toast.success("Данные изменены!", {
      autoClose: 3000,
      theme: "dark"
    });
  };

  if (loadingUsersStatus) return <Preloader />;

  return (
    <form onSubmit={onSubmitForm} className="col-lg-9">
      <div className="d-flex align-item-center title mb-3">
        <h5 className="m-0 font-weight-normal">Настройки</h5>
      </div>
      <div className="p-4 bg-dark">
        <div className="row gutter-1">
          <div className="col-md-6">
            <InputField
              error={error.name}
              type="text"
              title="Имя"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputField
              error={error.email}
              type="email"
              title="Почта"
              value={data.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="text-right mt-4">
        <button disabled={!isValid} className="btn btn-light">
          Сохранить изменения
        </button>
      </div>
    </form>
  );
};

export default RefreshUser;

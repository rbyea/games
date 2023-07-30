import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategories } from "../../../store/categoriesSlice";
import { validator } from "../../../utils/validator";
import InputField from "../../ui/form/inputField";
import SelectField from "../../ui/form/selectField";
import { toast } from "react-toastify";
import TextareaField from "../../ui/form/textareaField";
import { getListGames } from "../../../store/gamesSlice";
import MultiSelectField from "../../ui/form/multiSelectField";
import {
  createSlide,
  getLoadingSliderStatus
} from "../../../store/sliderSlice";
import Preloader from "../../ui/preloader/preloader";
import { Redirect, useParams } from "react-router-dom";
import { getUser } from "../../../store/usersSlice";

const CreateSlider = (props) => {
  const { userId } = useParams();
  const currentUser = useSelector(getUser());

  const isAdmin =
    currentUser && currentUser.length > 0 && currentUser[0].isAdmin;

  if (!isAdmin) {
    return <Redirect to={`/account/${userId}`} />;
  }
  const dispatch = useDispatch();

  const [error, setError] = React.useState({});

  const [count, setCount] = React.useState(0);

  const loadingStatus = useSelector(getLoadingSliderStatus());
  const categoriesList = useSelector(getListCategories());
  const gameList = useSelector(getListGames());
  const [categories, setCategories] = React.useState();
  const [game, setGame] = React.useState();
  const initialState = {
    title: "",
    category: [],
    description: "",
    gameId: "",
    image: ""
  };
  const [data, setData] = React.useState(initialState);

  React.useEffect(() => {
    if (categoriesList.length > 0) {
      const categoriesObj = categoriesList.map((optionName) => ({
        value: optionName._id,
        label: optionName.name
      }));
      setCategories(categoriesObj);
      setCount((prevCount) => prevCount++);
    }
  }, [categoriesList]);

  React.useEffect(() => {
    if (gameList.length > 0) {
      const gameObj = gameList.map((optionName) => ({
        value: optionName._id,
        label: optionName.title
      }));

      setGame(gameObj);
      setCount((prevCount) => prevCount++);
    }
  }, [gameList]);

  const validatorConfig = {
    title: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    description: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    gameId: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    image: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    console.log(target.value);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const transformData = (data) => {
    const transformArray = [];
    data.map((qual) =>
      transformArray.push({ _id: qual.value, title: qual.label })
    );

    return transformArray;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      toast.error("Поля не заполнены!", {
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    const { category, gameId } = data;

    const newData = {
      ...data,
      category: transformData(category),
      gameId: gameId
    };

    dispatch(createSlide(newData));
    toast.success("Слайд добавлен!", {
      autoClose: 3000,
      theme: "dark"
    });
    setData({ ...initialState, category: [] });
    console.log(data);
  };

  if (count === 2 || loadingStatus) return <Preloader />;
  return (
    <>
      <form onSubmit={onSubmitForm} className="col-lg-9">
        <div className="d-flex align-item-center title mb-3">
          <h5 className="m-0 font-weight-normal">Добавить слайд на главную</h5>
        </div>
        <div className="p-4 bg-dark">
          <div className="row gutter-1">
            <div className="col-md-6">
              {game && (
                <SelectField
                  error={error.gameId}
                  label="Игра"
                  options={game}
                  value={data.gameId}
                  name="gameId"
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="col-md-6">
              {categories && (
                <MultiSelectField
                  defaultValue={data.category}
                  options={categories}
                  onChange={handleChange}
                  name="category"
                  label="Особенности"
                  defaultOption="Выбрать..."
                />
              )}
            </div>
            <div className="col-md-6">
              <InputField
                error={error.title}
                type="text"
                title="Заголовок"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextareaField
                error={error.description}
                value={data.description}
                onChange={handleChange}
                title="Описание"
                name="description"
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.image}
                type="text"
                title="Картинка"
                value={data.image}
                name="image"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="text-right mt-4">
          <button className="btn btn-light">Добавить слайд</button>
        </div>
      </form>
    </>
  );
};

export default CreateSlider;

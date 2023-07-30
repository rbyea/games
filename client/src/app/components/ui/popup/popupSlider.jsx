import React from "react";
import PropTypes from "prop-types";
import InputField from "../form/inputField";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingUsersStatus } from "../../../store/usersSlice";
import Preloader from "../preloader/preloader";
import { getListGames } from "../../../store/gamesSlice";
import SelectField from "../form/selectField";
import MultiSelectField from "../form/multiSelectField";
import { getListCategories } from "../../../store/categoriesSlice";
import TextareaField from "../form/textareaField";
import { getSliderById, updateSlide } from "../../../store/sliderSlice";
import { toast } from "react-toastify";

const PopupSlider = ({ visibleModal, setVisibleModal, slideId }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    setVisibleModal(false);
  };

  const gameList = useSelector(getListGames());

  const userLoading = useSelector(getLoadingUsersStatus());
  const categoriesList = useSelector(getListCategories());
  const listSliderId = useSelector(getSliderById(slideId));

  const [error, setError] = React.useState({});

  const [data, setData] = React.useState({
    title: "",
    category: [],
    description: "",
    gameId: "",
    image: ""
  });
  const [game, setGame] = React.useState();
  const [categories, setCategories] = React.useState();

  React.useEffect(() => {
    if (gameList.length > 0) {
      const gameObj = gameList.map((optionName) => ({
        value: optionName._id,
        label: optionName.title
      }));

      setGame(gameObj);
    }
  }, [gameList]);

  const getCategoriesSlider = (categoriesIds) => {
    const resultArray = [];
    for (const ids of categoriesIds) {
      for (const category of categoriesList) {
        if (ids === category._id) {
          resultArray.push({
            label: category.name,
            value: category._id
          });
          break;
        }
      }
    }
    return resultArray;
  };

  React.useEffect(() => {
    if (categoriesList.length > 0) {
      const categoriesObj = categoriesList.map((optionName) => ({
        value: optionName._id,
        label: optionName.name
      }));
      setCategories(categoriesObj);
    }
  }, [categoriesList]);

  React.useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...listSliderId,
      category: getCategoriesSlider(listSliderId.category)
    }));
  }, [listSliderId]);

  const validatorConfig = {
    gameId: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    category: {
      min: {
        message: "Добавьте хотя бы одно свойство!",
        value: 1
      }
    },
    title: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    description: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    image: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
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

  const transformData = (data) => {
    const transformArray = [];
    data.map((qual) =>
      transformArray.push({ _id: qual.value, title: qual.label })
    );

    return transformArray;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      toast.error("Поля не заполнены!", {
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    const { category } = data;
    const newData = {
      ...data,
      category: transformData(category)
    };

    dispatch(updateSlide(newData));

    console.log(newData);
  };

  if (userLoading) return <Preloader />;

  return (
    <div className={`modal ${visibleModal ? "show" : ""}`} id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Редактировать
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
              <InputField
                error={error.title}
                type="text"
                title="Заголовок"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
              <TextareaField
                error={error.description}
                value={data.description}
                onChange={handleChange}
                title="Описание"
                rows="5"
                name="description"
              />
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

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Закрыть
            </button>

            <button
              disabled={!isValid}
              className="btn btn-primary"
              onClick={(e) => onSubmitForm(e)}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupSlider.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func,
  title: PropTypes.string,
  slideId: PropTypes.string
};

export default PopupSlider;

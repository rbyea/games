import React from "react";
import PropTypes from "prop-types";
import InputField from "../form/inputField";
import { validator } from "../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
// import history from "../../../utils/history";
import { toast } from "react-toastify";

import { getGameById, updateGame } from "../../../store/gamesSlice";
import { getSliderId } from "../../../store/sliderCardSlice";
import { getSpecificationId } from "../../../store/specificationSlice";
import TextareaField from "../form/textareaField";
import CheckBoxField from "../form/checkboxField";
import { getListCategories } from "../../../store/categoriesSlice";
import { getListFeatures } from "../../../store/featuresSlice";
import MultiSelectField from "../form/multiSelectField";

const PopupGame = ({ visibleModal, setVisibleModal, gameId }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    setVisibleModal(false);
  };

  const listGameId = useSelector(getGameById(gameId));
  const listSlider = useSelector(getSliderId(gameId));
  const listSpecification = useSelector(getSpecificationId(gameId));

  const categoriesList = useSelector(getListCategories());
  const featuresList = useSelector(getListFeatures());

  const [categories, setCategories] = React.useState();
  const [features, setFeatures] = React.useState();

  const [error, setError] = React.useState({});
  const [data, setData] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(true);

  const getCategoriesGame = (categoriesIds) => {
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

  const getFeaturesGame = (featuresIds) => {
    const resultArray = [];
    for (const ids of featuresIds) {
      for (const feature of featuresList) {
        if (ids === feature._id) {
          resultArray.push({
            label: feature.name,
            value: feature._id
          });
          break;
        }
      }
    }
    return resultArray;
  };

  React.useEffect(() => {
    if (categoriesList) {
      const categoriesObj = categoriesList.map((optionName) => ({
        label: optionName.name,
        value: optionName._id
      }));
      setCategories(categoriesObj);
    }
  }, [categoriesList]);

  React.useEffect(() => {
    if (featuresList) {
      const featuresObj = featuresList.map((optionName) => ({
        value: optionName._id,
        label: optionName.name
      }));
      setFeatures(featuresObj);
    }
  }, [featuresList]);

  React.useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...(({ categories, features, ...rest }) => rest)(listGameId),
      ...(({ gameId, _id, ...rest }) => rest)(listSlider),
      images: Array.isArray(listSlider.images)
        ? listSlider.images.filter((item) => typeof item === "string").join(",")
        : "",
      ...(({ gameId, _id, ...rest }) => rest)(listSpecification)
    }));
  }, [listGameId, listSlider]);
  React.useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      categories: getCategoriesGame(listGameId.categories),
      features: getFeaturesGame(listGameId.features)
    }));

    setIsLoading(false);
  }, [listGameId]);

  const validatorConfig = {
    title: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    video: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    images: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    cpu: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    gpu: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    system: {
      isRequired: {
        message: "Поле обязательна для заполнения!"
      }
    },
    price: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    discount: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    work: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    data: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    series: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    language: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    receipts: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    developer: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    description: {
      isRequired: {
        message: "Поле обязателена для заполнения!"
      }
    },
    picture: {
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
    const { categories, features, images } = data;

    const newData = {
      ...data,
      categories: transformData(categories),
      features: transformData(features),
      images: images.split(/[ ,]+/)
    };

    dispatch(updateGame(newData));
    setVisibleModal(false);
  };

  return (
    <>
      {!isLoading && (
        <div
          className={`modal ${visibleModal ? "show" : ""}`}
          id="exampleModal"
        >
          <div className="modal-dialog modal-dialog-game">
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
                  <InputField
                    type="text"
                    value={data.title}
                    error={error.title}
                    title="Название"
                    name="title"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.picture}
                    error={error.picture}
                    title="Картинка"
                    name="picture"
                    onChange={handleChange}
                  />
                  <TextareaField
                    value={data.images}
                    error={error.images}
                    onChange={handleChange}
                    title="Картинки в слайдере (через запятую)"
                    rows="6"
                    name="images"
                  />
                  <InputField
                    type="text"
                    value={data.video}
                    error={error.video}
                    title="Видео"
                    name="video"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.work}
                    error={error.work}
                    title="Система работы"
                    name="work"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.language}
                    error={error.language}
                    title="Язык"
                    name="language"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.series}
                    error={error.series}
                    title="Серия"
                    name="series"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.price}
                    error={error.price}
                    title="Цена"
                    name="price"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.discount}
                    error={error.discount}
                    title="Скидка"
                    name="discount"
                    onChange={handleChange}
                  />
                  <InputField
                    type="date"
                    value={data.data}
                    error={error.data}
                    title="Дата"
                    name="data"
                    onChange={handleChange}
                  />
                  <TextareaField
                    value={data.description}
                    error={error.description}
                    onChange={handleChange}
                    title="Описание"
                    rows="6"
                    name="description"
                  />

                  <MultiSelectField
                    defaultValue={data.categories}
                    options={categories}
                    onChange={handleChange}
                    name="categories"
                    label="Категории"
                  />
                  <MultiSelectField
                    defaultValue={data.features}
                    options={features}
                    onChange={handleChange}
                    name="features"
                    label="Особенности"
                  />
                  <InputField
                    type="text"
                    value={data.developer}
                    error={error.developer}
                    title="Разработчик"
                    name="developer"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.cpu}
                    error={error.cpu}
                    title="CPU"
                    name="cpu"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.gpu}
                    error={error.gpu}
                    title="GPU"
                    name="gpu"
                    onChange={handleChange}
                  />
                  <InputField
                    type="number"
                    value={data.directx}
                    error={error.directx}
                    title="Direct X"
                    name="directx"
                    onChange={handleChange}
                  />
                  <InputField
                    type="number"
                    value={data.ram}
                    error={error.ram}
                    title="Ram"
                    name="ram"
                    onChange={handleChange}
                  />
                  <InputField
                    type="number"
                    value={data.size}
                    error={error.size}
                    title="Размер"
                    name="size"
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    value={data.system}
                    error={error.system}
                    title="Система"
                    name="system"
                    onChange={handleChange}
                  />
                  <CheckBoxField
                    value={data.topSales}
                    error={error.topSales}
                    name="topSales"
                    onChange={handleChange}
                  >
                    Топ продажи
                  </CheckBoxField>
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
                  className="btn btn-primary"
                  onClick={(e) => onSubmitForm(e)}
                >
                  Обновить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PopupGame.propTypes = {
  gameId: PropTypes.string.isRequired,
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func
};

export default PopupGame;

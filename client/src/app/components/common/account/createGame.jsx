import React from "react";
import { validator } from "../../../utils/validator";
import CheckBoxField from "../../ui/form/checkboxField";
import InputField from "../../ui/form/inputField";
import { toast } from "react-toastify";
import TextareaField from "../../ui/form/textareaField";
import { useDispatch, useSelector } from "react-redux";
import { getListCategories } from "../../../store/categoriesSlice";
import MultiSelectField from "../../ui/form/multiSelectField";
import { getListFeatures } from "../../../store/featuresSlice";
import { createGame } from "../../../store/gamesSlice";
import { getUser } from "../../../store/usersSlice";
import { Redirect, useParams } from "react-router-dom";

const CreateGame = (props) => {
  const { userId } = useParams();
  const currentUser = useSelector(getUser());

  const isAdmin =
    currentUser && currentUser.length > 0 && currentUser[0].isAdmin;

  if (!isAdmin) {
    console.log(isAdmin);
    return <Redirect to={`/account/${userId}`} />;
  }

  const dispatch = useDispatch();

  const [error, setError] = React.useState({});

  const categoriesList = useSelector(getListCategories());
  const featuresList = useSelector(getListFeatures());

  const [categories, setCategories] = React.useState();
  const [features, setFeatures] = React.useState();

  const [data, setData] = React.useState({
    title: "",
    price: "",
    video: "",
    discount: "",
    series: "",
    language: "",
    work: "",
    data: "",
    receipts: "",
    developer: "",
    description: "",
    picture: "",
    categories: [],
    features: [],
    topSales: false,
    images: "",
    cpu: "",
    gpu: "",
    directx: 0,
    system: "",
    size: 0,
    ram: 0
  });

  React.useEffect(() => {
    if (categoriesList) {
      const categoriesObj = categoriesList.map((optionName) => ({
        value: optionName._id,
        label: optionName.name
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
    const { categories, features, images } = data;

    const newData = {
      ...data,
      categories: transformData(categories),
      features: transformData(features),
      images: images.split(/[ ,]+/)
    };

    dispatch(createGame(newData));
    toast.success("Игра добавлена!", {
      autoClose: 3000,
      theme: "dark"
    });
  };
  const [activeTab, setActiveTab] = React.useState(1);

  const handleNextTab = () => {
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handlePrevTab = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  return (
    <>
      <form onSubmit={onSubmitForm} className="col-lg-9">
        <div className="d-flex align-item-center title mb-3">
          <h5 className="m-0 font-weight-normal">Добавить игру</h5>
        </div>
        <div
          className={
            activeTab === 1 ? `p-4 bg-dark tab active` : `p-4 bg-dark tab`
          }
        >
          <div className="row gutter-1">
            <div className="col-md-6">
              <InputField
                error={error.title}
                type="text"
                title="Название"
                value={data.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.price}
                type="text"
                title="Цена"
                value={data.price}
                name="price"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.video}
                type="text"
                title="Видео"
                value={data.video}
                name="video"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.discount}
                type="text"
                title="Скидка"
                value={data.discount}
                name="discount"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.series}
                type="text"
                title="Серия"
                value={data.series}
                name="series"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.language}
                type="text"
                title="Язык"
                value={data.language}
                name="language"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <MultiSelectField
                defaultValue={data.categories}
                options={categories}
                onChange={handleChange}
                name="categories"
                label="Категории"
                defaultOption="Выбрать..."
              />
            </div>
            <div className="col-md-6">
              <MultiSelectField
                defaultValue={data.features}
                options={features}
                onChange={handleChange}
                name="features"
                label="Особенности"
                defaultOption="Выбрать..."
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.work}
                type="text"
                title="Платформа"
                value={data.work}
                name="work"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.data}
                type="date"
                title="Дата выхода"
                value={data.data}
                name="data"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.receipts}
                type="data"
                title="Дата релиза"
                value={data.receipts}
                name="receipts"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.picture}
                type="data"
                title="Картинка"
                value={data.picture}
                name="picture"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <TextareaField
                error={error.description}
                title="Описание"
                value={data.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.developer}
                type="text"
                title="Разработчик"
                value={data.developer}
                name="developer"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <CheckBoxField
                error={error.topSales}
                value={data.topSales}
                name="topSales"
                onChange={handleChange}
              >
                Топ продажи (отображение на главной странице)
              </CheckBoxField>
            </div>
          </div>
        </div>

        <div
          className={
            activeTab === 2 ? `p-4 bg-dark tab active` : `p-4 bg-dark tab`
          }
        >
          <div className="row gutter-1">
            <div className="col-md-12">
              <TextareaField
                error={error.images}
                title="Список слайдов (через запятую)"
                value={data.images}
                name="images"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div
          className={
            activeTab === 3 ? `p-4 bg-dark tab active` : `p-4 bg-dark tab`
          }
        >
          <div className="row gutter-1">
            <div className="col-md-6">
              <InputField
                error={error.cpu}
                type="text"
                title="CPU"
                value={data.cpu}
                name="cpu"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.gpu}
                type="text"
                title="GPU"
                value={data.gpu}
                name="gpu"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.directx}
                type="number"
                title="DirectX"
                value={data.directx}
                name="directx"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.system}
                type="text"
                title="System"
                value={data.system}
                name="system"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.size}
                type="number"
                title="Size"
                value={data.size}
                name="size"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputField
                error={error.ram}
                type="number"
                title="Ram"
                value={data.ram}
                name="ram"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="text-right mt-4">
          {activeTab === 3 ? (
            <>
              <a
                href="#"
                onClick={handlePrevTab}
                className="btn btn-light mr-2"
              >
                Назад
              </a>
              <button className="btn btn-light">Добавить игру</button>
            </>
          ) : (
            <>
              <a
                href="#"
                onClick={handlePrevTab}
                className={
                  activeTab === 1
                    ? `btn btn-light mr-2 btn-disabled`
                    : `btn btn-light mr-2`
                }
              >
                Назад
              </a>
              <a href="#" onClick={handleNextTab} className="btn btn-light">
                Далее
              </a>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateGame;

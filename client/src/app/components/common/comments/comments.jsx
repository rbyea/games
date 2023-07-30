import React from "react";
import TextareaField from "../../ui/form/textareaField";
import { validator } from "../../../utils/validator";
import Comment from "./comment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createComments,
  getLoadingStatusComments,
  loadCommentsList
} from "../../../store/commentsSlice";
import { getCurrentUser, getIsLoggedIn } from "../../../store/usersSlice";
import localStorageService from "../../../services/localStorage.service";
import { FaSignInAlt } from "react-icons/fa";

const Comments = (props) => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const currentUser = useSelector(
    getCurrentUser(localStorageService.getLocalIdKey())
  );
  const isLoadingStatus = useSelector(getLoadingStatusComments());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const [data, setData] = React.useState({
    description: "",
    name: "",
    gameId: gameId
  });
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    dispatch(loadCommentsList(gameId));
  }, [gameId]);

  React.useEffect(() => {
    if (currentUser && isLoggedIn) {
      setData((prevState) => ({
        ...prevState,
        name: currentUser.name
      }));
    }
  }, [currentUser, isLoggedIn]);

  const validatorConfig = {
    description: {
      isRequired: {
        message: "Поле не должно быть пустым!"
      },
      min: {
        message: "Поле должно состоять минимум из 3 символов",
        value: 3
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

  const onSubmitForm = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    dispatch(createComments(data));
    setData((prevState) => ({
      ...prevState,
      description: ""
    }));
  };

  return (
    <>
      <div className="card my-4">
        {isLoggedIn ? (
          <>
            <h5 className="card-header">Оставить комментарий:</h5>

            <div className="card-body">
              <form onSubmit={onSubmitForm}>
                <TextareaField
                  error={error.description}
                  value={data.description}
                  onChange={handleChange}
                  rows="4"
                  name="description"
                />
                <button type="submit" className="btn btn-primary">
                  Отправить
                </button>
              </form>
            </div>
          </>
        ) : (
          <Link to="/login" className="comment-link p-3">
            <FaSignInAlt />
            Войдите, что бы оставить комментарий
          </Link>
        )}
      </div>

      {!isLoadingStatus ? <Comment /> : "Загрузка..."}
    </>
  );
};

export default Comments;

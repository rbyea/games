import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getLoadingUsersStatus,
  logOut
} from "../../../store/usersSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import User from "../../../assets/p13.png";
import Preloader from "../../ui/preloader/preloader";

const ArticlePage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userId } = useParams();

  const loadingUser = useSelector(getLoadingUsersStatus());
  const currentUser = useSelector(getCurrentUser(userId));
  const exitAcc = () => {
    dispatch(logOut());
  };

  const pathClass = (path) => {
    const strPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
    return strPathname === path ? "active" : "";
  };

  if (loadingUser) return <Preloader />;

  return (
    <div className="col-lg-3">
      <div className="position-sticky">
        <div className="gradient-1 inner-profile text-white p-5 widget text-center">
          <img className="img-profile rounded-circle" src={User} />
          <h5 className="mb-1 mt-3">{currentUser.name}</h5>
          <a href="#" onClick={exitAcc} className="btn btn btn-light btn-sm">
            Выход
          </a>
        </div>
        <div className="bg-dark p-3 sidebar-widget mb-4">
          <div className="nav nav-pills flex-column lavalamp">
          {/* 64b9893927897bef82caa12e */}
            {currentUser.isAdmin && (
              <>
                <Link
                  to={`/account/${userId}/table-games`}
                  className={`nav-link ${pathClass("table-games")}`}
                >
                  Таблица товаров
                </Link>
                <Link
                  to={`/account/${userId}/table-slider`}
                  className={`nav-link ${pathClass("table-slider")}`}
                >
                  Таблица слайдов
                </Link>
                <Link
                  to={`/account/${userId}/create-game`}
                  className={`nav-link ${pathClass("create-game")}`}
                >
                  Добавить товар
                </Link>
                <Link
                  to={`/account/${userId}/create-slider`}
                  className={`nav-link ${pathClass("create-slider")}`}
                >
                  Добавить слайд на главной
                </Link>
              </>
            )}
            <Link
              to={`/account/${userId}`}
              className={`nav-link ${pathClass(userId)}`}
            >
              Личный кабинет
            </Link>
            <Link
              to={`/account/${userId}/favorite`}
              className={`nav-link ${pathClass("favorite")}`}
            >
              Избранное
            </Link>
            <Link
              className={`nav-link ${pathClass("edit")}`}
              to={`/account/${userId}/edit`}
            >
              Настройки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

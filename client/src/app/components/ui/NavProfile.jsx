import React from "react";
import { Link, useLocation } from "react-router-dom";
import User from "../../assets/p13.png";
import { useSelector } from "react-redux";
import { getCurrentUser, getCurrentUserId } from "../../store/usersSlice";

const NavProfile = (props) => {
  const { pathname } = useLocation();
  const currentUserId = useSelector(getCurrentUserId());
  const currentUser = useSelector(getCurrentUser(currentUserId));
  const pathClass = (path) => {
    const strPathname = pathname.substring(pathname.lastIndexOf("/") + 1);
    return strPathname === path ? "active" : "";
  };

  return (
    <li className="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
      <Link
        to={`/account/${currentUserId}`}
        className="nav-link dropdown-toggle pr-0"
      >
        <img className="img-profile rounded-circle" src={User} />
      </Link>

      <div className="dropdown-menu dropdown-menu-right shadow-sm">
        <Link
          to={`/account/${currentUserId}`}
          className="p-3 d-flex align-items-center"
        >
          <div className="dropdown-list-image mr-3">
            <img className="rounded-circle" src={User} alt="" />
            <div className="status-indicator bg-success"></div>
          </div>
          <div className="font-weight-bold">
            {currentUser && (
              <div className="text-truncate">{currentUser.name}</div>
            )}
          </div>
        </Link>
        <div className="dropdown-divider"></div>

        <Link
          className={`dropdown-item ${pathClass(currentUserId)}`}
          to={`/account/${currentUserId}`}
        >
          <i className="feather-edit mr-1"></i> Личный кабинет
        </Link>

        <Link
          className={`dropdown-item ${pathClass("favorite")}`}
          to={`/account/${currentUserId}/favorite`}
        >
          <i className="feather-heart mr-1"></i> Избранное
        </Link>
      </div>
    </li>
  );
};

export default NavProfile;

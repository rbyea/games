import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/usersSlice";
import UserPage from "../common/account/userPage";
import ArticlePage from "../common/account/articlePage";
import RefreshUser from "../common/account/refreshUser";
import FavoritePage from "../common/account/favoritePage";
import CreateGame from "../common/account/createGame";
import CreateSlider from "../common/account/createSlider";
import TableGames from "../common/account/tableGames";
import TableSlider from "../common/account/tableSlider";

const Personalaccount = (props) => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      {userId === currentUserId ? (
        <section className="py-5 account-page vh-100">
          <div className="container">
            <div className="row">
              <ArticlePage />
              {edit === "edit" ? (
                userId === currentUserId ? (
                  <RefreshUser />
                ) : (
                  <Redirect to={`/account/${currentUserId}`} />
                )
              ) : edit === "favorite" ? (
                <FavoritePage />
              ) : edit === "create-game" ? (
                <CreateGame />
              ) : edit === "create-slider" ? (
                <CreateSlider />
              ) : edit === "table-games" ? (
                <TableGames />
              ) : edit === "table-slider" ? (
                <TableSlider />
              ) : (
                <div className="col-lg-9">
                  <UserPage />
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Personalaccount;

import React from "react";
import { FaRegEdit, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteGame, getListGames } from "../../../store/gamesSlice";
import { Link, Redirect, useParams } from "react-router-dom";
import PopupGame from "../../ui/popup/popupGame";
import { getUser } from "../../../store/usersSlice";
const TableGames = (props) => {
  const { userId } = useParams();
  const currentUser = useSelector(getUser());

  const isAdmin =
    currentUser && currentUser.length > 0 && currentUser[0].isAdmin;

  if (!isAdmin) {
    return <Redirect to={`/account/${userId}`} />;
  }

  const dispatch = useDispatch();
  const tableList = useSelector(getListGames());

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [gameId, setGameId] = React.useState();

  const handleEdit = (gameId) => {
    setGameId(gameId);
    setVisibleModal(true);
  };

  const handleRemove = (gameId) => {
    const conf = confirm("Действительно хотите удалить игру с БД?");
    if (conf) {
      dispatch(deleteGame(gameId));
    }
  };

  return (
    <div className="col-lg-9">
      {visibleModal && (
        <PopupGame
          setVisibleModal={setVisibleModal}
          visibleModal={visibleModal}
          gameId={gameId}
        />
      )}
      <div className="d-flex align-item-center title mb-3">
        <h5 className="m-0 font-weight-normal">Таблица игр</h5>
      </div>
      {tableList ? (
        <>
          <div className="tableCollumn">
            {tableList.map((game) => (
              <div key={game._id} className="gameList">
                <div className="gameLeft">
                  <Link to={`/card/${game._id}`} className="gameImage">
                    <img src={game.picture} alt="" />
                  </Link>
                  <Link to={`/card/${game._id}`} className="gameTitle">
                    {game.title}
                  </Link>
                </div>
                <div className="gameWrap">
                  <button
                    onClick={() => handleEdit(game._id)}
                    className="btn btn-light"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(game._id)}
                    className="btn btn-danger"
                  >
                    <FaWindowClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        "Товаров нет"
      )}
    </div>
  );
};

export default TableGames;

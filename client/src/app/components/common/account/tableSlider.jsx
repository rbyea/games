import React from "react";
import { FaRegEdit, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { deleteSlide, getSliderList } from "../../../store/sliderSlice";
import PopupSlider from "../../ui/popup/popupSlider";
import { toast } from "react-toastify";
import { getUser } from "../../../store/usersSlice";

const TableSlider = (props) => {
  const { userId } = useParams();
  const currentUser = useSelector(getUser());

  const isAdmin =
    currentUser && currentUser.length > 0 && currentUser[0].isAdmin;

  if (!isAdmin) {
    return <Redirect to={`/account/${userId}`} />;
  }

  const dispatch = useDispatch();
  const tableList = useSelector(getSliderList());

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [slideGame, setSlideGame] = React.useState();

  const handleEdit = (slideGame) => {
    setSlideGame(slideGame);
    setVisibleModal(true);
  };

  const handleRemove = (slideId) => {
    const conf = confirm("Действительно хотите удалить игру с БД?");
    if (conf) {
      dispatch(deleteSlide(slideId));
      toast.success("Слайд удален", {
        autoClose: 3000,
        theme: "dark"
      });
    }
  };

  return (
    <div className="col-lg-9">
      {visibleModal && (
        <PopupSlider
          setVisibleModal={setVisibleModal}
          visibleModal={visibleModal}
          slideId={slideGame}
        />
      )}
      <div className="d-flex align-item-center title mb-3">
        <h5 className="m-0 font-weight-normal">Таблица слайдов</h5>
      </div>
      {tableList ? (
        <>
          <div className="tableCollumn">
            {tableList.map((slide) => (
              <div key={slide._id} className="gameList">
                <div className="gameLeft">
                  <Link to={`/`} className="gameTitle">
                    {slide.title}
                  </Link>
                </div>
                <div className="gameWrap">
                  <button
                    onClick={() => handleEdit(slide._id)}
                    className="btn btn-light"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(slide._id)}
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

export default TableSlider;

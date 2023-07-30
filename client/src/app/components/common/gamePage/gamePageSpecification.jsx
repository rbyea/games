import React from "react";
import { useSelector } from "react-redux";
import { getSpecificationItem } from "../../../store/specificationSlice";
import { useParams } from "react-router-dom";

const GamePageSpecification = (props) => {
  const { gameId } = useParams();

  const specifications = useSelector((state) =>
    getSpecificationItem(state, gameId)
  );

  if (!specifications) return "Загрузка...";

  return (
    <div className="section-card pt-4" id="specifications">
      <h5 className="mb-3 mt-4">Характеристики</h5>
      <div className="p-5 bg-dark specifications">
        <ul className="nav nav-tabs">
          <li className="nav-item" role="presentation">
            <div className="nav-link active">WINDOWS</div>
          </li>
        </ul>
        <div className="tab-content">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">ОС</p>
                <p className="text-white">{specifications.system}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">Процессор</p>
                <p className="text-white">{specifications.cpu}</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">Видеокарта</p>
                <p className="text-white">{specifications.gpu}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">Оперативная память</p>
                <p className="text-white">{specifications.ram}GB </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">Жесткий диск</p>
                <p className="text-white">{specifications.size}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="list-icon">
                <p className="text-white-50 mb-1">DirectX</p>
                <p className="text-white">{specifications.directx}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePageSpecification;

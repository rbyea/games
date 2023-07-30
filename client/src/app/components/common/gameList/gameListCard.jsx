import React from "react";
import PropTypes from "prop-types";
import { discountFunc } from "../../../utils/discountFunc";
import { Link } from "react-router-dom";

const GameListCard = ({
  title,
  discount,
  data,
  price,
  picture,
  _id: id,
  receipts
}) => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="osahan-card">
        <Link to={`/card/${id}`}>
          <div className="osahan-card__image">
            <img className="img-fluid" src={picture} alt="" />
          </div>
          <div className="osahan-card-body mt-3">
            <h6 className="text-white mb-1">{title}</h6>
            {data && <p className="mb-0 text-white-50">{data}</p>}
            {price && discount && (
              <div className="price mt-3">
                {Number(discount) !== 0 && (
                  <>
                    <div
                      className={`${
                        Number(discount) > 20 ? "bg-danger" : "bg-primary"
                      }  d-inline-block text-center px-2 py-1 text-white`}
                    >
                      -{discount}%
                    </div>
                    <del className="text-white-50 mx-1">{price} руб.</del>
                  </>
                )}

                <span className="text-white">
                  {price - discountFunc(price, discount)} руб.
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

GameListCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  discount: PropTypes.string,
  data: PropTypes.string,
  price: PropTypes.string,
  picture: PropTypes.string,
  receipts: PropTypes.string
};

export default GameListCard;

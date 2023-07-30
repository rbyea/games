import React from "react";
import { discountFunc } from "../../utils/discountFunc";
import PropTypes from "prop-types";

const Price = ({ discount, price }) => {
  return (
    <>
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

      {Number(discount) !== 0 ? (
        <span className="text-white">
          {price - discountFunc(price, discount)} руб.
        </span>
      ) : (
        <span className="text-white">{price} руб.</span>
      )}
    </>
  );
};

Price.propTypes = {
  discount: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default Price;

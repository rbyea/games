import React from "react";
import { windowScroll } from "../../utils/windowScroll";
import { useSelector } from "react-redux";
import { getListBasket, getLoadingStatusBasket } from "../../store/basketSlice";
import BasketEmpty from "../common/basketBlock/basketEmpty";
import BasketUnder from "../common/basketBlock/basketUnder";
import BasketList from "../common/basketBlock/basketList";
import Preloader from "../ui/preloader/preloader";

const Basket = (props) => {
  React.useEffect(() => {
    windowScroll();
  }, []);

  const listBasket = useSelector(getListBasket());
  const loadStatusBasket = useSelector(getLoadingStatusBasket());

  if (loadStatusBasket) return <Preloader />;

  return (
    <section className="py-5 basket">
      <div className="vh-100">
        <div className="container">
          {listBasket.length === 0 ? (
            <BasketEmpty />
          ) : (
            <>
              <BasketList listBasket={listBasket} />
              <BasketUnder listBasket={listBasket} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Basket;

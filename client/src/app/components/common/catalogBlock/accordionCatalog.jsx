import React from "react";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import CheckField from "../../ui/form/checkboxField";

const AccordionCatalog = ({ title, data, selectedItems, setSelectedItems }) => {
  const [activeAccordion, setActiveAccordion] = React.useState(false);
  const [visibleList, setVisibleList] = React.useState(false);

  const handleClickAccordion = (e) => {
    e.preventDefault();

    setActiveAccordion(!activeAccordion);
  };

  const handleClickBtn = (e) => {
    e.preventDefault();

    setVisibleList(!visibleList);
  };

  const handleChange = (target) => {
    const updatedItems = { ...selectedItems };
    updatedItems[target.name] = target.value;
    setSelectedItems(updatedItems);
  };

  return (
    <>
      <div className="filters-card border-bottom py-4">
        <div className="filters-card-header" id="headingOne">
          <h6 className="mb-0">
            <a href="#" className="btn-link" onClick={handleClickAccordion}>
              {title}
              <i
                className={`float-right ${
                  activeAccordion ? "" : "active-arrow"
                }`}
              >
                <FaArrowRight />
              </i>
            </a>
          </h6>
        </div>

        <div className={`${activeAccordion ? "" : "show"} collapse`}>
          <div className="filters-card-body card-shop-filters">
            {data &&
              data.map((item, index) => (
                <div
                  key={item._id}
                  className={`filters-card__item ${
                    index > 3 && !visibleList ? "hidden" : ""
                  }`}
                >
                  <CheckField
                    type="checkbox"
                    value={selectedItems[item._id]}
                    onChange={handleChange}
                    name={item._id}
                  >
                    {item.name}
                  </CheckField>
                </div>
              ))}

            <div className="mt-2">
              <a href="#" onClick={handleClickBtn} className="link">
                {visibleList ? "Скрыть" : "Смотреть все"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AccordionCatalog.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  selectedItems: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  setSelectedItems: PropTypes.func
};

export default AccordionCatalog;

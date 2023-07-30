import React from "react";
import { useSelector } from "react-redux";
import { getListGamesLength } from "../../../store/gamesSlice";
import PropTypes from "prop-types";
import SelectField from "../../ui/form/selectField";

const SortCatalog = ({ onSortChange }) => {
  const gamesLength = useSelector(getListGamesLength());
  const [data, setData] = React.useState({
    sort: ""
  });
  const sortOptions = [
    {
      value: "1231dqwfqwf12312fqwf1",
      label: "По возрастанию",
      task: "asc"
    },
    {
      value: "dkln1lk2bn3jk12b312ljk312",
      label: "По убыванию",
      task: "desc"
    }
  ];

  const handleSortChange = (target) => {
    const selectedValue = target.value;
    setData((prevState) => ({
      ...prevState,
      [target.name]: selectedValue
    }));
    onSortChange(selectedValue);
  };

  return (
    <div className="d-flex align-item-center title mb-3 sort-flex">
      <h5 className="m-0 font-weight-normal">
        Всего товаров - <span className="text-white-50">{gamesLength}</span>
      </h5>

      <SelectField
        label="Сортировать по цене:"
        name="sort"
        onChange={handleSortChange}
        options={sortOptions}
        value={data.sort}
      />
    </div>
  );
};

SortCatalog.propTypes = {
  onSortChange: PropTypes.func.isRequired
};

export default SortCatalog;

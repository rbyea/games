import React from "react";
import { useSelector } from "react-redux";
import { getListGames, getLoadingStatusGames } from "../../../store/gamesSlice";
import GameListCard from "../gameList/gameListCard";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../ui/pagintaion";

const CatalogGames = ({
  selectedCategories,
  selectedFeatures,
  data,
  sortOrder
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 9;
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const listGames = useSelector(getListGames());
  const loadingGames = useSelector(getLoadingStatusGames());
  const filteredGames = listGames.filter((game) => {
    const gameTitle = game.title.toLowerCase();
    const searchQuery = data;
    const isMatchingSearch = gameTitle.includes(searchQuery);
    const selectedCategoryValues = Object.values(selectedCategories);
    const selectedFeatureValues = Object.values(selectedFeatures);
    if (
      selectedCategoryValues.every((value) => value === false) &&
      selectedFeatureValues.every((value) => value === false)
    ) {
      return isMatchingSearch;
    }

    const hasSelectedCategory = Object.keys(selectedCategories).some(
      (categoryId) =>
        selectedCategories[categoryId] && game.categories.includes(categoryId)
    );
    const hasSelectedFeature = Object.keys(selectedFeatures).some(
      (featureId) =>
        selectedFeatures[featureId] && game.features.includes(featureId)
    );

    console.log(isMatchingSearch);

    return (hasSelectedCategory || hasSelectedFeature) && isMatchingSearch;
  });

  const sortGamesByPrice = (games, order) => {
    return games.slice().sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
  };

  const sortedGames = sortGamesByPrice(filteredGames, sortOrder);

  const count = sortedGames.length;

  const gamesCrop = paginate(sortedGames, currentPage, pageSize);
  return (
    <div className="row">
      {!loadingGames
        ? gamesCrop.map((game) => <GameListCard key={game._id} {...game} />)
        : "Загрузка..."}

      <div className="col-lg-12 text-center">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

CatalogGames.propTypes = {
  data: PropTypes.string,
  selectedCategories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedFeatures: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortOrder: PropTypes.string
};

export default CatalogGames;

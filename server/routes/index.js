const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/features", require("./features.routes"));
router.use("/categories", require("./categories.routes"));
router.use("/slider", require("./slider.routes"));
router.use("/games", require("./games.routes"));
router.use("/sliderCard", require("./sliderCard.routes"));
router.use("/specifications", require("./specification.routes"));
router.use("/users", require("./user.routes"));
router.use("/basket", require("./basket.routes"));
router.use("/payment", require("./payment.routes"));
router.use("/favorite", require("./favorite.route"));
router.use("/comments", require("./comments.routes"));

module.exports = router;

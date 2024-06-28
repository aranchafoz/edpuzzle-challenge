const router = require("express").Router();

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "I am healthyyyy!" });
});

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = router;

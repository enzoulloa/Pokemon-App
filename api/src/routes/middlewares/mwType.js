const { Router } = require("express");
const { getTypes } = require("../controllers/types.js");

const router = Router();

router.get("", async (req, res) => {
  try {
    const types = await getTypes();
    console.log(types);
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

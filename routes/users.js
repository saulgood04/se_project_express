const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  login,
} = require("../controllers/users");

router.post("/login", login);

module.exports = router;

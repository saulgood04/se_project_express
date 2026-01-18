const router = require("express").Router();
const { login, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/me", auth, getCurrentUser);

module.exports = router;

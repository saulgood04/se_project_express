const router = require("express").Router();
const { login, getCurrentUser, updateCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/login", login);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;

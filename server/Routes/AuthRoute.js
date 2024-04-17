const { Signup, Login  } = require("../Controllers/AuthController");
const { userVerification,userVerificationMobile } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.post('/mobile',userVerificationMobile);

module.exports = router;
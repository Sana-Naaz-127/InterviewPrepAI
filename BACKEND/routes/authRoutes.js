const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const User = require("../models/User");


const {
  signupUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch(error){

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;
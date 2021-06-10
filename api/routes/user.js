"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/authenticate-user");

// Construct a router instance.
const router = express.Router();
// Import the models.
const { User, Course } = require("../models");

// Return the user that is currently authenticated.
router.get(
    "/",
    authenticateUser,
    asyncHandler(async (req, res) => {
        const userId = req.currentUser.id;
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        });
        res.json(user);
    })
);

// Create a user, set the location header to '/' and return no content.
router.post(
    "/",
    asyncHandler(async (req, res) => {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        await User.create(req.body);
        res.location("/");
        res.status(201).end();
    })
);

module.exports = router;

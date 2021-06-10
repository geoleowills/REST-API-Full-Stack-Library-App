"use strict";

const auth = require("basic-auth");
const express = require("express");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/authenticate-user");

// Construct a router instance
const router = express.Router();
// Import the models
const { User, Course } = require("../models");

// Return a list of all courses and shows details for the user that
// owns each course.
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const courses = await Course.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User,
                    attributes: ["firstName", "lastName", "emailAddress"],
                },
            ],
        });
        res.json(courses);
    })
);

// Return the course for the provided course ID, show
// details for the user that owns the course.
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const course = await Course.findByPk(req.params.id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                {
                    model: User,
                    attributes: ["firstName", "lastName", "emailAddress"],
                },
            ],
        });

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({
                message: "Id Not Found.",
            });
        }
    })
);

// Create a course, set the location header to the URI for the course and return no content.
router.post(
    "/",
    authenticateUser,
    asyncHandler(async (req, res) => {
        const course = await Course.create(req.body);
        res.location(`/api/courses/${course.id}`);
        res.status(201).end();
    })
);

// Update a course only if the current authenticated user is the owner
// of the course. Return a 403 status code if user attempts to update a
// course that they do not own. If update is successful, no content returned.
router.put(
    "/:id",
    authenticateUser,
    asyncHandler(async (req, res) => {
        const course = await Course.findByPk(req.params.id);
        const user = req.currentUser;

        if (course && user.id === course.userId) {
            await course.update(req.body);
            res.status(204).end();
        } else if (course && user.id !== course.userId) {
            res.status(403).json({
                message: "You can only update courses that belong to you.",
            });
        } else {
            res.status(404).json({
                message: `The course with the id ${req.params.id} could not be found.`,
            });
        }
    })
);

// Delete a course only if the currently authenticated user is the owner
// of the course. Return no content.
router.delete(
    "/:id",
    authenticateUser,
    asyncHandler(async (req, res) => {
        const course = await Course.findByPk(req.params.id);
        const user = req.currentUser;

        if (course && user.id === course.userId) {
            course.destroy();
            res.status(204).end();
        } else if (course && user.id !== course.userId) {
            res.status(403).json({
                message: "You can only delete courses that belong to you.",
            });
        } else {
            res.status(404).json({
                message: `The course with the id ${req.params.id} could not be found.`,
            });
        }
    })
);

module.exports = router;

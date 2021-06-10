"use strict";

const Sequelize = require("sequelize");

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please provide a first name.",
                    },
                    notEmpty: {
                        msg: "Please provide a first name.",
                    },
                },
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please provide a last name.",
                    },
                    notEmpty: {
                        msg: "Please provide a last name.",
                    },
                },
            },
            emailAddress: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: "The email address you have provided is already in use.",
                },
                /* Custom validator, using the standard 'isEmpty' and 'isEmail' validators
                both will be called and display error messages if an empty string is entered, 
                the custom validator allows for only one of the below errors to be thrown. */
                validate: {
                    isEmailOrEmpty(val) {
                        if (val === null || val === "") {
                            throw new Error("Please provide an email address.");
                        } else {
                            if (!emailIsValid(val)) {
                                throw new Error("Email address is not valid.");
                            }
                        }
                    },
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please provide a password.",
                    },
                    notEmpty: {
                        msg: "Please provide a password.",
                    },
                },
            },
        },
        { sequelize }
    );

    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please provide a User ID.",
                    },
                    notEmpty: {
                        msg: "Please provide a User ID.",
                    },
                },
            },
        });
    };

    return User;
};

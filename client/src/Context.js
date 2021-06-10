import React, { createContext, useState } from "react";
import { DataHelper } from "./DataHelper";
import Cookies from "js-cookie";

export const Context = createContext();

const Provider = ({ children }) => {
    // Create an instance of the DataHelper class to be accessible in global state.
    const [dataHelper, setDataHelper] = useState(new DataHelper());
    // Set initial state of 'authenticatedUser' from cookies, or to null.
    const [authenticatedUser, setAuthenicatedUser] = useState(
        Cookies.getJSON("authenticatedUser") || null
    );
    // Set initial state of 'token' from cookies, or to null.
    const [token, setToken] = useState(Cookies.getJSON("token") || null);
    // Set inital state of currentCourse to null.
    const [currentCourse, setCurrentCourse] = useState(null);

    /**
     *
     * @param {string} emailAddress - Users email address.
     * @param {*} password - Users password.
     *
     * Handles user sign in.
     */
    const signIn = async (emailAddress, password) => {
        // Encode credentials in Base64.
        const encodedCredentials = btoa(`${emailAddress}:${password}`);
        const token = `Basic ${encodedCredentials}`;

        // Attempt to retrieve user, if user is not null, sets 'token' and 'authenticatedUser' state
        // and sets 'token' and 'authenticatedUser' cookies. If null is returned, returns null.
        const user = await dataHelper.getUser(token);
        if (user !== null) {
            setToken(token);
            setAuthenicatedUser(user);

            // Set cookies to expire after 1 day.
            Cookies.set("authenticatedUser", JSON.stringify(user), {
                expires: 1,
            });
            Cookies.set("token", JSON.stringify(token), { expires: 1 });
        }
        return user;
    };

    // Handles user sign out. Sets 'authenticatedUser' and 'token' state back to null and removes cookies.
    const signOut = () => {
        setAuthenicatedUser(null);
        setToken(null);

        Cookies.remove("authenticatedUser");
        Cookies.remove("token");
    };

    const value = {
        authenticatedUser,
        setAuthenicatedUser,
        dataHelper,
        setDataHelper,
        currentCourse,
        setCurrentCourse,
        token,
        setToken,
        signIn,
        signOut,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;

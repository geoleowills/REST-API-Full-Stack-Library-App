import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import { Redirect } from "react-router-dom";

const UserSignOut = () => {
    // Access data from our global state using the useContext hook.
    const { signOut } = useContext(Context);
    // Call 'signOut' function when component is rendered.
    useEffect(() => signOut());

    // Redirect to homepage.
    return <Redirect to="/" />;
};

export default UserSignOut;

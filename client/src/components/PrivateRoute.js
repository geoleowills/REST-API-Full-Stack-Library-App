import { React, useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { Context } from "../Context";

/* Component that wraps routes that require authorization to view. Find the component 
property defined on props and assign it to a new location in state we call Component. 
Checks if user is logged in, if so, render the component, else redirect to 'sign in' page.
If redirected to 'sign in' page, location the user came from is passed down via state so user 
can be directed back to the page after signing in. */
const PrivateRoute = ({ component: Component, ...rest }) => {
    // Access data from our global state using the useContext hooks.
    const { authenticatedUser } = useContext(Context);
    // Create location object so we are able to access location.
    const location = useLocation();

    return (
        <Route
            {...rest}
            render={(props) =>
                authenticatedUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

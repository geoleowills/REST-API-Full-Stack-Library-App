import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

const UserSignIn = (props) => {
    // Access data from our global state using the useContext hook.
    const { signIn } = useContext(Context);
    // Create stateful user variable.
    const [user, setUser] = useState({
        emailAddress: "",
        password: "",
    });
    // Create stateful errors variable.
    const [errors, setErrors] = useState([]);
    // Create history object so we are able to access history.
    const history = useHistory();

    // Update state value when form is updated for input with corresponding name.
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, ...{ [name]: value } });
    };

    // Handle form submit.
    const submit = (e) => {
        e.preventDefault();
        /* If user is not signed in and has been redirected to the sign in page by the 'PrivateRoute'
        component, props.location.state will contain the location the user was redirected from - this
        was set in the 'PrivateRoute' component and passed down via props. This allows us to redirect
        back to the previous location after signing in. If user has not been redirected by the
        'PrivateRoute' component, set 'from' to the homepage path. */
        const { from } = props.location.state || { from: { pathname: "/" } };
        const { emailAddress, password } = user;
        /* Attempt to sign in with provided email address and password, if successful, push the user
        back to whatever location 'from' has been set to, if unsuccessful, set 'errors' to display
        a message and reset form. */
        signIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                    setErrors(["Sign-in was unsuccessful"]);
                    e.target.reset();
                } else {
                    history.push(from);
                }
            })
            .catch(() => history.push("/error"));
    };

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <div>
                        {/* If the error state contains any errors in the array, display errors. */}
                        {errors.length > 0 ? (
                            <React.Fragment>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {errors.map((error) => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            </React.Fragment>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <form onSubmit={submit}>
                        <div>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                placeholder="Email Address"
                                onChange={change}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={change}
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">
                                Sign In
                            </button>
                            <Link className="button button-secondary" to="/">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p>
            </div>
        </div>
    );
};

export default UserSignIn;

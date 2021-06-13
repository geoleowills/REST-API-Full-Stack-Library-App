import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

const UserSignUp = () => {
    // Access data from our global state using the useContext hook.
    const { dataHelper, signIn } = useContext(Context);
    // Create stateful user variable containing user object.
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
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
        /* Checks that the 'password' and 'confirmPassword' the user has entered are the same.
        If so, creates 'newUser' payload. */
        if (user.password === user.confirmPassword) {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                password: user.password,
            };
            /* Attempt to create user using the 'createUser' 'dataHelper' class method, if
            successful an empty array is returned, 'SignIn' function is called, and user
            pushed to homepage. If array of errors is returned, 'errors' state is set and 
            these are displayed to user. */
            dataHelper
                .createUser(newUser)
                .then((errors) => {
                    if (errors.length) {
                        setErrors(errors);
                    } else {
                        signIn(user.emailAddress, user.password)
                            .then(() => history.push("/"))
                            .catch(() => history.push("/error"));
                    }
                })
                .catch(() => history.push("/error"));
        } else {
            setErrors(["Passwords do not match."]);
        }
    };

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
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
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={change}
                            />
                        </div>
                        <div>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={change}
                            />
                        </div>
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
                        <div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={change}
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">
                                Sign Up
                            </button>
                            <Link className="button button-secondary" to="/">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>
                    Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                </p>
            </div>
        </div>
    );
};

export default UserSignUp;

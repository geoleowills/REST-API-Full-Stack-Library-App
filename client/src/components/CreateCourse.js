import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";

const CreateCourse = () => {
    // Access data from our global state using the useContext hook.
    const { authenticatedUser, token, dataHelper } = useContext(Context);
    // Create stateful course variable containing course object.
    const [course, setCourse] = useState({
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
    });
    // Create stateful errors variable.
    const [errors, setErrors] = useState([]);
    // Create history object so we are able to access history.
    const history = useHistory();

    // Update state value when form is updated for input with corresponding name.
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCourse({ ...course, ...{ [name]: value } });
    };

    // Handle form submit.
    const submit = (e) => {
        e.preventDefault();
        // Build newCourse payload.
        const newCourse = {
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: authenticatedUser.id,
        };
        /* Attempt to create course using the 'createCourse' dataHelper class method, if
        successful, pushes to homepage, if errors are returned, sets the errors in state
        and these will be displayed to the user. */
        dataHelper
            .createCourse(newCourse, token)
            .then((errors) => {
                if (!errors.length) {
                    history.push("/");
                } else {
                    setErrors(errors);
                }
            })
            .catch(() => history.push("/error"));
    };

    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
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
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="input-title course--title--input"
                                    placeholder="Course title..."
                                    onChange={change}
                                />
                            </div>
                            <p>
                                By {authenticatedUser.firstName} {authenticatedUser.lastName}
                            </p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea
                                    id="description"
                                    name="description"
                                    className=""
                                    placeholder="Course description... Please use markdown syntax if you would like."
                                    onChange={change}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            className="course--time--input"
                                            placeholder="Hours"
                                            onChange={change}
                                        />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            className=""
                                            placeholder="List materials... Please use markdown syntax if you would like."
                                            onChange={change}
                                        ></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">
                            Create Course
                        </button>
                        <Link className="button button-secondary" to="/">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { useHistory, useParams, Link } from "react-router-dom";

const UpdateCourse = () => {
    // Access data from our global state using the useContext hook.
    const { dataHelper, currentCourse, setCurrentCourse, token, authenticatedUser } = useContext(
        Context
    );
    // Create stateful errors variable.
    const [errors, setErrors] = useState([]);
    // Get id paramater using useParams Hook.
    let { id } = useParams();
    // Create history object so we are able to access history.
    let history = useHistory();

    // When component mounts, retreive data with matching id paramater and save it in state.
    useEffect(() => {
        dataHelper
            // Call the 'getCourse' method from the 'dataHelper' class.
            .getCourse(id)
            .then((res) => {
                if (res === 404) {
                    history.push("/notfound");
                } else if (authenticatedUser) {
                    if (authenticatedUser.id === res.userId) {
                        setCurrentCourse(res);
                    } else {
                        history.push("/forbidden");
                    }
                } else {
                    history.push("/signin");
                }
            })
            .catch(() => history.push("/error"));
        // Use empty array as second argument so useEffect will only run after inital render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update state value when form is updated for input with corresponding name.
    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCurrentCourse({ ...currentCourse, ...{ [name]: value } });
    };

    // Handle form submit.
    const submit = (e) => {
        e.preventDefault();
        // Build updatedCourse payload.
        const updatedCourse = {
            id,
            title: currentCourse.title,
            description: currentCourse.description,
            estimatedTime: currentCourse.estimatedTime,
            materialsNeeded: currentCourse.materialsNeeded,
            userId: authenticatedUser.id,
        };

        /* Attempt to update course using the 'updateCourse' 'dataHelper' class method.
        If successful, pushes user to the updated 'Course Detail' page, if errors are returned, 
        sets the errors in state and these will be displayed to the user. */
        dataHelper
            .updateCourse(id, updatedCourse, token)
            .then((errors) => {
                if (!errors.length) {
                    history.push(`/courses/${id}`);
                } else {
                    setErrors(errors);
                }
            })
            .catch(() => history.push("/error"));
    };

    if (!currentCourse) {
        return <p>Loading...</p>;
    }

    return (
        <React.Fragment>
            <hr />
            <div className="bounds course--detail">
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
                <h1>Update Course</h1>
                <div>
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
                                        value={currentCourse.title}
                                        onChange={change}
                                    />
                                </div>
                                <p>
                                    By {currentCourse.User.firstName} {currentCourse.User.lastName}
                                </p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className=""
                                        placeholder="Course description..."
                                        value={currentCourse.description}
                                        onChange={change}
                                    />
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
                                                value={currentCourse.estimatedTime}
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
                                                placeholder="List materials..."
                                                value={currentCourse.materialsNeeded}
                                                onChange={change}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">
                                Update Course
                            </button>
                            <Link className="button button-secondary" to={`/courses/${id}`}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UpdateCourse;

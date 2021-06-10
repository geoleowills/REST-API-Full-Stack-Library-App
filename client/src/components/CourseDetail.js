import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import { useHistory, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CourseDetail = () => {
    // Access data from our global state using the useContext hook.
    const { dataHelper, currentCourse, setCurrentCourse, token, authenticatedUser } = useContext(
        Context
    );
    // Get id paramater using useParams Hook.
    let { id } = useParams();
    // Create history object so we are able to access history.
    let history = useHistory();

    // When component mounts, retrieve course data using 'id' param and save in 'currentCourse' state.
    useEffect(() => {
        dataHelper
            // Call the 'getCourse' method from the 'dataHelper' class.
            .getCourse(id)
            .then((res) => {
                if (res === 404) {
                    history.push("/notfound");
                } else {
                    setCurrentCourse(res);
                }
            })
            .catch(() => history.push("/error"));
        // Use empty array as second argument so useEffect will only run after inital render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Set current course to null when compnent unmounts. Otherwise the course will be held in 
    global state and when CourseDetail is rendered again, it will briefly show the old 'currentCourse'
    rather than the loading screen while the new one is still loading. */
    useEffect(() => {
        /* When you return a function inside the useEffect hook and use the enpty array argument
        it will be called as if using componentWillUnmount. */
        return () => setCurrentCourse(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Deletecourse function handles the delete course button, if successful, destorys course and
    pushes user to the homepage. */
    const deleteCourse = () => {
        dataHelper
            .deleteCourse(currentCourse.id, token)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                history.push("/error");
            });
    };

    // If there is no current course, display loading page.
    if (!currentCourse) {
        return <p>Loading...</p>;
    }

    return (
        <React.Fragment>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {authenticatedUser && authenticatedUser.id === currentCourse.userId ? (
                            <span>
                                <Link className="button" to={`/courses/${id}/update`}>
                                    Update Course
                                </Link>
                                <button className="button" onClick={deleteCourse}>
                                    Delete Course
                                </button>
                            </span>
                        ) : (
                            <span></span>
                        )}
                        <Link className="button button-secondary" to="/">
                            Return to List
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{currentCourse.title}</h3>
                        <p>
                            By {currentCourse.User.firstName} {currentCourse.User.lastName}
                        </p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown>{currentCourse.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{currentCourse.estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ReactMarkdown>{currentCourse.materialsNeeded}</ReactMarkdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CourseDetail;

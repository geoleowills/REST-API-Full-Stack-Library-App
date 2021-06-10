import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { useHistory, Link } from "react-router-dom";
import Course from "./Course";

const Courses = () => {
    // Access data from our global state using the useContext hook.
    const { dataHelper } = useContext(Context);
    // Create stateful courses variable.
    const [courses, setCourses] = useState(null);
    // Create history object so we are able to access history.
    let history = useHistory();

    // Retrieve all courses and store them in the 'courses' state.
    useEffect(() => {
        dataHelper
            .getCourses()
            .then((courses) => setCourses(courses))
            .catch(() => history.push("/error"));
        // Use empty array as second argument so useEffect will only run after inital render.
    }, []);

    let courseList;
    // Check if courses exist and map individual courses to 'Course' component, save array to courseList variable.
    if (courses) {
        courseList = courses.map((course) => (
            <Course id={course.id} title={course.title} key={course.id} />
        ));
    }

    return (
        <div className="bounds">
            {courseList}
            <div className="grid-33">
                <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13 13"
                            className="add"
                        >
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </Link>
            </div>
        </div>
    );
};

export default Courses;

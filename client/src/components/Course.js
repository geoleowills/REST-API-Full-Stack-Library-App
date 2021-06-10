import React from "react";
import { Link } from "react-router-dom";

const Course = (course) => (
    <div className="grid-33">
        <Link className="course--module course--link" to={`/courses/${course.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
        </Link>
    </div>
);

export default Course;

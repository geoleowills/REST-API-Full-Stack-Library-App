import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="bounds">
        <h1>Page not found!</h1>
        <Link to={"/"} className="button button-secondary">
            Return to Courses
        </Link>
    </div>
);

export default NotFound;

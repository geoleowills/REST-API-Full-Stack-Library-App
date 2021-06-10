import React from "react";
import { Link } from "react-router-dom";

const UnhandledError = () => (
    <div className="bounds">
        <h1>Error</h1>
        <p>An unexpected error has occurred.</p>
        <Link to={"/"} className="button button-secondary">
            Return to Courses
        </Link>
    </div>
);

export default UnhandledError;

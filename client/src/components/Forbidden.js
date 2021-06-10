import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p>You can not access the requested page.</p>
        <Link to="/" className="button button-secondary">
            Return to Courses
        </Link>
    </div>
);

export default Forbidden;

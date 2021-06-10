import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component imports.
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";
import UserSignIn from "./components/UserSignIn";
import Forbidden from "./components/Forbidden";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <Switch>
                    <Route exact path="/" component={Courses} />{" "}
                    <PrivateRoute path="/courses/create" component={CreateCourse} />
                    <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
                    <Route path="/courses/:id" component={CourseDetail} />
                    <Route path="/signup" component={UserSignUp} />
                    <Route path="/signin" component={UserSignIn} />
                    <Route path="/signout" component={UserSignOut} />
                    <Route path="/forbidden" component={Forbidden} />
                    <Route path="/error" component={UnhandledError} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

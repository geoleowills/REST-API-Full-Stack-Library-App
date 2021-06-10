import config from "./config";

export class DataHelper {
    /**
     *
     * @param {string} path - API path.
     * @param {string} method - GET, POST, PUT or DELETE.
     * @param {Object} [body=null] - Contains request data, for example, Course or User data to update.
     * @param {boolean} [requiresAuth=false] - Specifies if authorization is required.
     * @param {*} [credentials=null] - User credentials for authentication.
     *
     * API method used to make requests to the REST API.
     */
    api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            options.headers["Authorization"] = `${credentials}`;
        }

        return fetch(url, options);
    }

    /**
     *
     * @param {string} token -  Authentication token in the following pattern - 'Basic ${encodedCredentials}',
     * encodedCredentials = {emailAddress}:{password} encoded in Base64.
     *
     * Gets and returns users object if sign in is successful.
     */
    async getUser(token) {
        const response = await this.api("/users", "GET", null, true, token);
        if (response.status === 200) {
            return response.json().then((data) => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    /**
     *
     * @param {Object} user - Object that contains the following {firstName, lastName, emailAddress, password.
     * Attempts to create a new user in the DB, returns errors if unsuccessful.
     */
    async createUser(user) {
        const response = await this.api("/users", "POST", user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then((data) => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     * Retrieves and returns all courses from the DB.
     */
    async getCourses() {
        const response = await this.api("/courses", "GET");
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error();
        }
    }

    /**
     *
     * @param {number} id - PK of the course being retrieved.
     *
     * Attempts to retrieve a specific course object, if course can't be found, returns 404.
     */
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, "GET");
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 404) {
            return response.status;
        } else {
            throw new Error();
        }
    }

    /**
     *
     * @param {Object} course - Object that contains the following
     * {title, description, [estimatedTime], [materialsNeeded], userId}.
     * Creates a new course in the DB or returns errors if unsuccessful.
     * @param {string} token - Authentication token in the following pattern - 'Basic ${encodedCredentials}',
     * encodedCredentials = {emailAddress}:{password} encoded in Base64.
     *
     * Attempts to create a new course in the DB, returns errors if unsuccessful.
     */
    async createCourse(course, token) {
        const response = await this.api("/courses", "POST", course, true, token);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then((data) => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     *
     * @param {number} id - PK of the course being updated.
     * @param {Object} course - Object that contains the following
     * {title, description, [estimatedTime], [materialsNeeded], userId}.
     * @param {string} token - Authentication token in the following pattern - 'Basic ${encodedCredentials}',
     * encodedCredentials = {emailAddress}:{password} encoded in Base64.
     *
     * Attempts to update specific course in the DB, returns errors if unsuccessful.
     */
    async updateCourse(id, course, token) {
        const response = await this.api(`/courses/${id}`, "PUT", course, true, token);
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then((data) => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     *
     * @param {number} id - PK of course being deleted.
     * @param {string} token - Authentication token in the following pattern - 'Basic ${encodedCredentials}',
     * encodedCredentials = {emailAddress}:{password} encoded in Base64.
     *
     * Attempts to delete course from DB, returns errors if unsuccessful.
     */
    async deleteCourse(id, token) {
        const response = await this.api(`/courses/${id}`, "DELETE", null, true, token);
        if (response.status === 204) {
            return [];
        } else if (response.status === 401) {
            return response.json().then((data) => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
}

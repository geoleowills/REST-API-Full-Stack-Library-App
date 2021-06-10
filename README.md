# Full Stack Library Application

---

The application provides a way for users to administer a database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

The backend API is built using Express, Node.JS, Sequelize and PostgreSQL.

The front end is built with the React library and utilises the React Context API and React Hooks.

Key Features:

-   If a user attempts to accesss a private route that they are not authorized to view, they will either be redirected to the 'sign in' page.
-   Users are only able to update and delete courses that they own. When a user views a course detail page, the Delete and Update button are only displayed if they are the owner of that course.
-   User state is stored by cookies, so a user will remain logged in even if they close their broswer.
-   Course and user data is managed by CRUD operations with the API and stored in a local PostgreSQL Database.
-   The Sequelize library is used to manage the PostgreSQL database and define the models, models include validation, custom validators and assocations.

## How To Run The App

### Express API Setup

1. Move into the **/api** directory in your terminal.
2. Run `npm install` to install dependencies.
3. Run `npm run seed` to create and seed the database.
4. Run `npm start` to start the servers and sync the database models.
5. Open a new terminal windows and move on to below instructions.

### React App Setup

1. Move into the **/client** directory in your terminal.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React front end.
4. Browser should automatically open to localhost:3000, if not, open your browser and navigate to localhost:3000.

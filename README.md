#Installing react dependencies

```bash
npm install
npm install axios
npm install react-router-dom
npm install bootstrap
npm install jquery
```

#Setting up the database

install mysql (https://dev.mysql.com/downloads/installer/)
create a user (use of root is not recommended)
update username and password in application.properties file (line 11 and 12)
create a database called ESD (if not created, hibernate will create it automatically)
Verify and update mqsql port in application.properties file (line 13)
Required tables will be created automatically (ddl-auto=create in application.properties file, but this should be changed to update in production)
If not automatically created, create the tables manually (see ![create.sql](./create.sql) file) (Syntax : source {path/to/create.sql})
insert data in all the tables (see ![insert.sql](./insert.sql) file) (Syntax : source {path/to/insert.sql})

#Note
To insert data to admin table, exclude api path(/api/v1/admin) from interceptor (SecurityConfig.java, line 41)
Note : The password is stored in encrypted format, inserting fro sql without hasing will throw error while login
Use postman or curl to insert data to admin table as there is no frontend API for this
JSON format for admin table :
{
    "admin_id" : "1",
    "full_name": "admin",
    "email": "admin@gmail.com",
    "password": "admin"
}

-- All springboot dependecies are managed by maven, so no need to install anything

#Running the application

```bash
run java application (MiniApplication.java)
run react application (npm start)
```

#USE CASE
Allow the employee of admin department to login. Then view the specialisations of all students or filtered by various criteria such as domain, specialisation, etc. 
Note : The student has a specialisation in a particular domain if they have selected courses such that the cumulative sum in a certain
specialisation of those courses is greater than 20 credits.

#Database Schema
[Database Schema](./database_schema.png)

#Backend Structure
1. Controller : Handles the API requests
2. Service : Contains the business logic
3. Repository : Interacts with the database
4. Entity : Represents the database tables
5. DTO : Data Transfer Object (used for transferring data between processes)
6. Mapper : Maps the DTO to Entity and vice versa

#Backend Security
1. JWT is used for security
2. A token is generated when the admin logs in
3. This token is used for all the subsequent requests
4. The token is sent in the header of the request with the key "Authorization" and the value "Bearer {token}"
5. Interceptor is used to intercept the all request except with path (api/v1/auth/**) and validate the token

#Exception Handling
1. A custom exception is used to handle the exceptions of invalid email(404) and password(401) in the login API
2. This exception is handled in the global level in the application

#Backend API
Backend handles three API requests :
1. /login (login as admin) (/api/v1/auth/login)
2. /validate (validate the token) (/api/v1/auth/validate)
3. /getallstudents (get all student details as per the use case) (/api/v1/student/getallstudents)

#Response Structure
{
    "rollNo": "101",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "domain": {
      "program": "B.Tech",
      "batch": "2021",
      "qualification": "CSEß"
    },
    "specialization": {
      "code": "AI102",
      "name": "AI"
    }
}

#Frontend Structure
1. Layout : Contains the main layout of the application
2. Pages : Contains the pages of the application 
    - [./src/pages/Login.jsx](./src/pages/Login.jsx) : Login page
    - [./src/pages/ViewStudents.jsx](./src/pages/ViewStudents.jsx) : Page to view all students details as per the use case
3. Components : Contains reusable components 
    - [./src/components/Dropdown.jsx](./src/components/Dropdown.jsx) : Dropdown component
    - [./src/components/Footer.jsx](./src/components/Footer.jsx) : Footer component
    - [./src/components/Header.jsx](./src/components/Header.jsx) : Header component
4. Hooks : Custom hooks 
    - [./src/hooks/useFilter.jsx](./src/hooks/useFilter.jsx) : Filter the students based on the criteria
    - [./src/hooks/usePagination.jsx](./src/hooks/usePagination.jsx) : Handing the pages
5. Utils : Utility functions 
    - [./src/utils/httputil.jsx](./src/utils/httputil.jsx) : Contains all the api calls
    - [./src/utils/sortData.jsx](./src/utils/sortData.jsx) : Sort the students data fetched from the backend based on the criteria

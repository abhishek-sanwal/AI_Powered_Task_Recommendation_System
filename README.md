<h1>
AI Powered Task Management System
</h1>

---

### Steps to run this project:

- ##### Clone repo

  ```

  git clone <repo>

  ```

- ##### Navigate to backend folder

  ```
  cd backend2
  ```

- ##### Install All backend dependencies

  ```
  pipenv install
  ```

- ##### Activate Virtual Environment

  ```
  pipenv shell
  ```

- Start **Mysql Server** and create a user **Tom** with password as **password** and grant ddl, dml, select permissions to it. Create a **restApi** database.

- Make sure it is listening to **port 3306** on localhost(http:127.0.0.1)

- ##### Load all environment variables

  ```
  source .env
  ```

- ##### Init

  ```
  flask db init
  ```

- ##### Migrate

  ```
  flask db migrate
  ```

- ##### Upgrade

  ```
  flask db upgrade
  ```

- ##### Start app

  ```
  flask run
  ```

- ##### Move one level up in directory

  ```
  cd ..
  ```

- ##### Move to Frontend

  ```
  cd frontend
  ```

- ##### Install Node modules

  ```
  npm install
  ```

- ##### Run Dev server(It is Vite app)

  ```
  npm run dev
  ```

---

#### Upcoming Features:

- Improvement in User Interface.
- Upgrade to PostgresDB.

---

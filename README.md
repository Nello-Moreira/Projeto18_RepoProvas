# SERVER TEMPLATE

This is a template for building a web server with postgreSQL as database.

## How to run

- Clone this repository
- Install all dependencies

```
npm i
```

- Change the file "create-tables.sql" (./database_scripts/scripts/create-tables.sql) to the desired tables names and variables
- Run on terminal: (at project's root directory)

```
 npx ts-node config.ts
```

This will create a production, a development and a test database and envs variables. It will also create a local user role for postgres database, if it doesn't exist.

- Edit the desired files and run server

## Commands to run

| Command                   | Action                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------- |
| npm run start             | Start server at production mode                                                         |
| npm run start:development | Start server at development mode                                                        |
| npm run start:test_driven | Start server at test driven development mode (it runs all tests each time files change) |
| npm run test              | Run all tests once                                                                      |
| npm run build             | transpile typescript files to javascript files at dist folder                           |

# API Docs

## Sign-up:

### Create an account

<details>
<summary>Request</summary>

- route: /sign-up
- method: post
- body:

```
{
    "name": (string),
    "email": (string)@(string)(.com, .net or .com.br),
    "password": (string)
}
```

</details>

<details>
<summary>Response</summary>

- status code: 201 created
- status code: 400 bad request (for invalid body)
- status code: 409 conflict (if email provided is already in use)
</details>
<br />

## Login:

### Access the app

<details>
<summary>Request</summary>

- route: /login
- method: post
- body:

```
{
    "email": (string)@(string)(.com, .net or .br),
    "password": (string)
}
```

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
{
    "name": (string),
    "token": (string)
}
```

- status code: 400 bad request (for invalid body)
- status code: 404 not found (for wrong email or password)
</details>
<br />

## Logout:

### End session

<details>
<summary>Request</summary>

- route: /logout
- method: post
- authorization: Bearer token
- body:

```
{ }
```

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- status code: 404 not found (for invalid token)

</details>
<br />

## Courses:

### Get all courses

<details>
<summary>Request</summary>

- route: /courses
- method: get
- authorization: Bearer token

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
[
    {
        "id": (number),
        "name": (string)
    }
]
```

</details>
<br />

### Get all subjects related to a course

<details>
<summary>Request</summary>

- route: /courses/:id/subjects
- method: get
- authorization: Bearer token

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
[
    {
        "id": (number),
        "name": (string),
        "season": (string),
        "examsQuantity": (number)
    }
]
```

- status code: 404 not found (if invalid id)

</details>
<br />

### Get all professors related to a course

<details>
<summary>Request</summary>

- route: /courses/:id/professors
- method: get
- authorization: Bearer token

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
[
    {
        "name": (string),
        "examsQuantity": (number)
    }
]
```

- status code: 404 not found (if invalid id)

</details>
<br />

## Subjects:

### Get all exams related to a subject

<details>
<summary>Request</summary>

- route: /subjects/:id
- method: get
- authorization: Bearer token

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
[
    {
        "id": (number),
        "name": (string),
        "category": (string),
        "professor": (string),
        "fileUrl": (string)
    }
]
```

- status code: 404 not found (if invalid id)

</details>
<br />

## Professors:

### Get all exams related to a professor

<details>
<summary>Request</summary>

- route: /professors/:id
- method: get
- authorization: Bearer token

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
[
    {
        "id": (number),
        "name": (string),
        "category": (string),
        "subject": (string),
        "fileUrl": (string)
    }
]
```

- status code: 404 not found (if invalid id)

</details>
<br />

## Exams:

### Post an exam

<details>
<summary>Request</summary>

- route: /exams
- method: post
- authorization: Bearer token
- body:

```
{
    "name": (string),
    "category": (string),
    "professor": (string),
    "subject": (string),
    "fileUrl": (string)
}
```

</details>

<details>
<summary>Response</summary>

- status code: 201 ok
- status code: 404 not found (if invalid category, professor or subject)

</details>
<br />

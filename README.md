# Projeto18_RepoProvas (front-end)

Would you like to make your academic life easier? This project is about that. Here you can share and view past exams to better prepare for upcoming exams.

This is the fron-end repository. You can check the front-end repository [here](https://github.com/Nello-Moreira/Projeto18_RepoProvas_front-end)

## Try it yourself!

You can access the [_project url_](https://projeto18-repoprovas-frontend.vercel.app/) and create a profile or use this example one:

-   e-mail: teste@teste.com
-   password: 123

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

## Check session:

### Verify if token is still valid

<details>
<summary>Request</summary>

- route: /session
- method: post
- body:

```
{
    "token": (string)
}
```

</details>

<details>
<summary>Response</summary>

- status code: 200 ok
- body:

```
{
    valid: (boolean)
}
```

- status code: 400 bad request (for invalid body)

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
- status code: 401 unauthorized (for invalid or expired token)

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

- status code: 204 no content (when there are no registered courses)
- status code: 401 unauthorized (for invalid or expired token)

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

- status code: 204 no content (when there are no registered subjects)
- status code: 400 bad request (if invalid course id)
- status code: 401 unauthorized (for invalid or expired token)
- status code: 404 not found (if there are no courses with provided id)

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
        "id": (number),
        "name": (string),
        "examsQuantity": (number)
    }
]
```

- status code: 204 no content (when there are no registered professors)
- status code: 400 bad request (if invalid course id)
- status code: 401 unauthorized (for invalid or expired token)
- status code: 404 not found (if there are no courses with provided id)

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

- status code: 204 no content
- status code: 400 bad request (if invalid subject id)
- status code: 401 unauthorized (for invalid or expired token)
- status code: 404 not found (if there are no subjects with provided id)

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

- status code: 204 no content
- status code: 400 bad request (if invalid professor id)
- status code: 401 unauthorized (for invalid or expired token)
- status code: 404 not found (if there are no professors with provided id)

</details>
<br />

## Exams:

### Get exams categories

<details>
<summary>Request</summary>

- route: /exams/categories
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

- status code: 204 no content
- status code: 401 unauthorized (for invalid or expired token)

</details>
<br />

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
    "categoryId": (number),
    "professorId": (number),
    "subjectId": (number),
    "fileUrl": (string)
}
```

</details>

<details>
<summary>Response</summary>

- status code: 201 ok
- status code: 401 unauthorized (for invalid or expired token)
- status code: 404 not found (if invalid category, professor or subject)

</details>
<br />

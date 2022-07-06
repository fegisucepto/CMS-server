## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /news`
- `POST /news`
- `GET /news/:id`
- `PUT /news/:id`
- `DELETE /news/:id`

### GET /register

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
  - Body
  ```json
  {
      "id": INTEGER,
      "title": STRING,
      "content": STRING,
      "imgUrl": STRING,
      "authorId": INTEGER,
      "categoryId": INTEGER,
      "createdAt": DATE,
      "updatedAt": DATE
  }
  ```
  #### Response

_201 - Register_

- Body

  ```json

   {
  "statusCode": 201,
  "message": "User Added Successfully",
  "data" : {
    id: Integer,
    email: String
    }
  }
  ```

  ### GET /login

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
  - Body
  ```json
  {
  "email": String,
  "password": String,
  }
  ```
  #### Response

_201 - Ok_

- Body

  ```json

   {
  "statusCode": 200,
  "data": {
    "access_token": String
  }
  }
  ```

### GET /news

#### Description

- Get all the News data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
      "id": 1,
      "title": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "content": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "imgUrl": "https://1.bp.blogspot.com/
      "authorId": "1",
      "categoryId": "1",
      "createdAt": "2022-05-30T11:50:58.113Z",
      "updatedAt": "2022-05-30T11:50:58.113Z"
      },
      ...
    ]
  }
  ```

### POST /news

#### Description

- Create a new News data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
      "id": INTEGER,
      "title": STRING,
      "content": STRING,
      "imgUrl": STRING,
      "authorId": INTEGER,
      "categoryId": INTEGER,
      "createdAt": DATE,
      "updatedAt": DATE
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "News created successfully",
    "data": {
      "id": INTEGER,
      "title": STRING,
      "content": STRING,
      "imgUrl": STRING,
      "authorId": INTEGER,
      "categoryId": INTEGER,
      "createdAt": DATE,
      "updatedAt": DATE
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### GET /news/:id

#### Description

- News data by Id

#### Response

_201 - Ok_

- Body
  ```json
  {
    "statusCode": 201,
    "data": {
      "id": 1,
      "title": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "content": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "imgUrl": "https://1.bp.blogspot.com",
      "authorId": "1",
      "categoryId": "1",
      "createdAt": "2022-05-30T11:50:58.113Z",
      "updatedAt": "2022-05-30T11:50:58.113Z"
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### PUT /news/:id

#### Description

- Update News data by Id

#### Request

- Params

```json
{
    id : integer
}
```

- Body
  ```json
  {
    "id": INTEGER,
      "title": STRING,
      "content": STRING,
      "imgUrl": STRING,
      "authorId": INTEGER,
      "categoryId": INTEGER,
      "createdAt": DATE,
      "updatedAt": DATE
    }
  }
  ```

#### Respon

_201 - Ok_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "News Update successfully",
    "data": {
      "id": 1,
      "title": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "content": "Bimbingan Belajar Spesialis Test CPNS dan PPPK",
      "imgUrl": "https://1.bp.blogspot.com",
      "authorId": "1",
      "categoryId": "1",
      "createdAt": "2022-05-30T11:50:58.113Z",
      "updatedAt": "2022-05-30T11:50:58.113Z"
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### DELETE /news/:id

#### Description

- Remove a news data based on given id

#### Response

_200 - OK_

- Body
  `json { "statusCode": 200, "message": "News {id} deleted successfully" } `
  _404 - Not Found_
- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "News not found"
    }
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```

# REST API Architecture Example

## What is an API?

An **API** (Application Programming Interface) is a set of rules and endpoints that allows different software applications to communicate with each other. APIs expose data and functionality, enabling integration between systems.

## What is a REST API?

A **REST API** (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources, which are represented as URLs.

## What is RESTful?

A **RESTful API** is an API that follows REST principles:
- Uses HTTP methods correctly
- Uses plural nouns for resources (`/clients`, `/orders`)
- Is stateless (each request contains all information needed)
- Uses proper status codes
- Provides resource representations (usually JSON)
- Supports filtering, pagination, and HATEOAS (Hypermedia as the Engine of Application State)

## Project Structure

```
rest-api-architecture/
│
├── config/
│   └── .env.development
    └── .env.staging
    └── .env.production
├── controllers/
│   └── clientsController.js
├── routes/
│   └── clients.js
├── data.json
├── logs/
│   └── app.log
├── server.js
├── swagger.yaml
└── README.md
```

## Features & Best Practices

- **Versioning:** All endpoints are under `/api/v1/`
- **Resources:** Example resource `/clients`
- **Filtering, Pagination, Sorting:** Query params like `?name=Ana&page=1&limit=10&sort=name`
- **HATEOAS:** Responses include navigation links
- **Security:** [helmet](https://www.npmjs.com/package/helmet) for HTTP headers
- **Rate Limiting:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to prevent abuse
- **CORS:** [cors](https://www.npmjs.com/package/cors) enabled for cross-origin requests
- **Logging:** [winston](https://www.npmjs.com/package/winston) for file and console logs
- **Error Handling:** Centralized error handler with meaningful messages and status codes
- **Environment Variables:** Managed with `.env` files in `/config`
- **Swagger/OpenAPI:** API documentation at `/api-docs` (if configured)
- **Health Check:** `/api/v1/health` endpoint

## Error Messages

- `400 Bad Request`: Missing or invalid data
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource (e.g., email already exists)
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Unexpected server error

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment:**
   - Edit `config/.env.development`:
     ```
     PORT=3000
     NODE_ENV=development
     ```

3. **Start the server:**
   ```sh
   NODE_ENV=development node server.js
   ```

4. **Test endpoints:**
   - Health: [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)
   - Clients: [http://localhost:3000/api/v1/clients](http://localhost:3000/api/v1/clients)

## Using Postman

### Example Requests

- **GET all clients:**
  ```
  GET http://localhost:3000/api/v1/clients
  ```

- **GET client by ID:**
  ```
  GET http://localhost:3000/api/v1/clients/1
  ```

- **POST new client:**
  ```
  POST http://localhost:3000/api/v1/clients
  Body (JSON):
  {
    "name": "Ana",
    "email": "ana@test.com"
  }
  ```

- **PUT update client:**
  ```
  PUT http://localhost:3000/api/v1/clients/1
  Body (JSON):
  {
    "name": "Ana Maria",
    "email": "ana.maria@test.com"
  }
  ```

- **DELETE client:**
  ```
  DELETE http://localhost:3000/api/v1/clients/1
  ```

## Good RESTful Practices

- Use plural nouns for resources (`/clients`)
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Provide clear error messages
- Support filtering, pagination, and sorting
- Use HATEOAS for discoverability
- Secure your API (rate limiting, helmet, CORS)
- Log requests and errors
- Document your API (Swagger/OpenAPI)

## Swagger/OpenAPI

If you have `swagger.yaml` in your project, you can serve documentation with [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express):

```js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

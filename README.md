# AlphabinWeatherApp


## Weather API Documentation

This documentation provides an overview of the Weather API, which allows users to register, log in, and access weather information.

### Base URL

The base URL for the API is: `https://alphabin-weather-backend.onrender.com`


### User Endpoints

#### Register a User

- Endpoint: `POST /register`
- Description: Creates a new user with the provided name, email, and password.
- Request Body:
  - `name`: The name of the user (string)
  - `email`: The email of the user (string)
  - `password`: The password for the user (string)
- Response:
  - `201`: User registration successful.
  - `202`: User already exists with the same email.
  - `400`: Unable to hash the password or something went wrong while registering.

#### User Login

- Endpoint: `POST /login`
- Description: Authenticates the user with the provided email and password and returns a JWT token for subsequent API requests.
- Request Body:
  - `email`: The email of the user (string)
  - `password`: The password for the user (string)
- Response:
  - `201`: Login successful. Returns a JWT token and the username.
  - `404`: Wrong password, please enter the correct password.
  - `404`: Wrong email, please enter the correct email.
  - `400`: Something went wrong while logging in.



### Weather Endpoints

#### Get Current Weather

- Endpoint: `GET /current`
- Description: Retrieves the current weather for a specified city.
- Query Parameters:
  - `city`: The name of the city (string)
- Response:
  - `200`: Got current weather successfully. Returns the weather data for the specified city.
  - `400`: Something went wrong while fetching current weather.

#### Get Weather Forecast

- Endpoint: `GET /forecast`
- Description: Retrieves the weather forecast for a specified city.
- Query Parameters:
  - `city`: The name of the city (string)
- Response:
  - `200`: Got forecast weather successfully. Returns the weather forecast data for the specified city.
  - `400`: Something went wrong while fetching forecast weather.

#### Add Preferred Weather

- Endpoint: `POST /preferred`
- Description: Adds weather data to the preferred list for the authenticated user.
- Authentication: Requires a valid JWT token in the request headers.
- Request Body:
  - Weather data object
- Response:
  - `201`: Data added to preferred successfully.
  - `400`: Something went wrong while posting preferred weather.

#### Get Preferred Weather

- Endpoint: `GET /preferred`
- Description: Retrieves the preferred weather list for the authenticated user.
- Authentication: Requires a valid JWT token in the request headers.
- Response:
  - `200`: Got preferred weather successfully. Returns the preferred weather data for the authenticated user.
  - `400`: Something went wrong while fetching preferred weather.

### Error Responses

The API returns appropriate HTTP status codes and JSON error messages for various error scenarios.

- `400`: Bad Request - The request is invalid or missing required parameters.
- `401`: Unauthorized - The request requires user authentication or the provided token is invalid.
- `404`: Not Found - The requested resource could not be found.
- `500`: Internal Server Error - An unexpected error occurred on the server.

### Authentication

The API uses JSON Web Tokens (Tokens) for authentication. To access protected endpoints, you need to include a valid JWT token in the request headers.

#### Authorization Header

Include the JWT token in the `Authorization` header of the request as follows:

```
Authorization:<token>
```

Replace `<token>` with the actual JWT token.


### Environment Variables

The API relies on the following environment variables, which should be defined in a `.env` file in the project directory:

- `port`: The port number for the server to listen on.
- `apikey`: The API key for accessing weather data.
- `key`:jsonwebtoken encryption key
- `url`:MongoDB atlas url for database 

Make sure to set these variables with their respective values before running the server.

### Dependencies

The API uses the following dependencies:

- `express`: A web application framework for Node.js.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
- `bcrypt`: Library for hashing passwords.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens.
- `isomorphic-fetch`: Library for making HTTP requests.
- `mongoose`: A MongoDB object modeling tool designed to work in an asynchronous environment, providing a straight-forward, schema-based solution for modeling data and interacting with MongoDB databases.

Make sure to install these dependencies using npm  before running the code.

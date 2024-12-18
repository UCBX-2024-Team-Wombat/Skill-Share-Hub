const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secret =
  process.env.JWT_SECRET != undefined
    ? process.env.JWT_SECRET
    : "development_secret";

const expiration =
  process.env.JWT_TOKEN_EXPIRATION != undefined
    ? process.env.JWT_TOKEN_EXPIRATION
    : "1h";

// Create standard authentication error using GraphQLError class
const AuthenticationError = new GraphQLError("Could not authenticate user.", {
  extensions: {
    code: "UNAUTHENTICATED",
  },
});

function authMiddleware({ req }) {
  // Retrieve token from either request body, query, or header authorization
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    // Split token, which uses "Bearer TOKEN_VALUE" format,
    // and use "pop" to bet last element (token)
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
}

function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { AuthenticationError, authMiddleware, signToken };

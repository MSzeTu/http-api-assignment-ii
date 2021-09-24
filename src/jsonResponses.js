const users = {};

// Returns with JSON Body
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Returns without JSON Body, takes request response and status
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user object as JSON
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// Add a user with name and age
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };
  if (!body.name || !body.age) { // Throw error if missing params
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  // Switch to 204 if object exists
  if (users[body.name]) {
    responseCode = 204;
  } else { // Otherwise create a new one
    users[body.name] = {};
  }

  // Add or update fields for username
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // If response is created, set a message and respond
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // 204 is empty, won't have a body. Respond with no message
  return respondJSONMeta(request, response, responseCode);
};

// For nonexistent Pages
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  const responseCode = 404;
  return respondJSON(request, response, responseCode, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
};

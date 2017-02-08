const users = { };

function makeUserObject(name, age, isMale) {
  return {
    name: name,
    age: age,
    isMale: isMale
  };
}

function makeUser(name, age, isMale) {
  var response = {payload: 'user is created', status: 200};

  const updateResponse = function (prop) {
    response.payload = 'Unknown prop: '+prop;
    response.status = 500;
  };

  if (!name) {
    name = 'unknown';
    updateResponse('name');
  }
  if (!age) {
    age = -1;
    updateResponse('age');
  }
  if (!isMale) {
    isMale = true;
    updateResponse('isMale');
  }

  users[Object.keys(users).length] = makeUserObject(name,age,isMale);
  return response;
}

function updateUser(id, data) {
  var user = users[id];
  if (!user) return {payload: 'user not found', status: 404};

  Object.keys(user).forEach(function(key){
    if (key in data) user[key] = data[key];
  });

  return {payload: 'user updated', status: 200};
}

function getUsers() {
  const response = {payload: {}, status: -1};
  response.status = Object.keys(users).length === 0 ? 404 : 200;
  response.payload = users;
  return response;
}

function getUser(id) {
  var user = users[id];
  const response = {payload: {}, status: 404};

  if (user) {
    response.payload = user;
    response.status = 200;
  }

  return response;
}

module.exports = {
  makeUser: makeUser,
  updateUser: updateUser,
  getUser: getUser,
  getUsers: getUsers
};
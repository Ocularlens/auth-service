const ApiError = require('./errors/apiError');
const registerSchema = require('./request/registerSchema');
const loginSchema = require('./request/loginSchema');
const registerService = require('./service/registerService');
const response = require('./util/response');
const validation = require('./util/validation');
const loginService = require('./service/loginService');
const verifyService = require('./service/verifyService');
const verifySchema = require('./request/verifySchema');

const register = async (context, req) => {
  try {
    validation(registerSchema, req.body);

    const { username, password } = req.body;
    await registerService(username, password);

    response(context, { message: "user registered" });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      response(context, { errors: error.message }, error.statusCode);
    } else {
      response(context, { message: 'Internal Server Error' }, 500);
    }
  }
  context.done();
};

const login = async (context, req) => {
  try {
    validation(loginSchema, req.body);

    const { username, password } = req.body;
    const token = await loginService(username, password);

    response(context, { message: "successful login", token });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      response(context, { errors: error.message }, error.statusCode);
    } else {
      response(context, { message: 'Internal Server Error' }, 500);
    }
  }
  context.done();
};


const verify = async (context, req) => {
  try {
    validation(verifySchema, req.body);

    const { token } = req.body;
    const userId = await verifyService(token);

    response(context, { message: "token verfified", userId });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      response(context, { errors: error.message }, error.statusCode);
    } else {
      response(context, { message: 'Internal Server Error' }, 500);
    }
  }
  context.done();
};

module.exports = {
  register,
  login,
  verify
}
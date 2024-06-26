const User = require('../model/user');
const ApiError = require('../errors/apiError');

const addUser = async (username, encryptedPass) => {
  try {
    const user = new User({ username, password: encryptedPass });
    await user.save();
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ApiError('username already exist', 422);
    }
    throw error;
  }
};

const findUserByUsername = async (username) => {
  return await User.findOne({
    where: {
      username
    }
  });
}

module.exports = { addUser, findUserByUsername };
const { cleanEnv, port, str } = require("envalid");

const validateEnv = () => {
  cleanEnv(process.env, {
    SECRET_KEY: str(),
    MONGO_URI: str(),
    PORT: port(),
  });
};

module.exports = validateEnv;

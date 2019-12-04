const bcrypt = require("bcrypt");

exports.encrypt = async pass => {
  if (!pass) return "";
  console.log(pass);
  return await bcrypt.hash(pass, 11);
};

exports.compare = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};
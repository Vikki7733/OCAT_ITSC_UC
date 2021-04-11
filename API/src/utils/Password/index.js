const { resolve } = require('app-root-path');
const bcrypt = require ('bcrypt');

const comparePasswords = async function (password, storedPassword, callBack ) {
  await bcrypt.compare(password, storedPassword, function(err, result) {
      callBack(result);
  });;
}

const getEncryptedPassword = async function (regularPassword, callback) {
  let hashedPassword = await bcrypt.hash(regularPassword, 10).then(function(hash) {
    
    return hash;
  });
  
  return hashedPassword;
}

module.exports.comparePassword = comparePasswords;
module.exports.getEncryptedPassword = getEncryptedPassword;
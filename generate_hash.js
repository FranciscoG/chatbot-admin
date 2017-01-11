
/***************************************************
  use this script to make a hash of a password and
  store that hash in the private/config.js file
*/

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = ''; // <-- PUT YOUR PLAIN TEXT PASSWORD HERE

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  console.log(hash);
});
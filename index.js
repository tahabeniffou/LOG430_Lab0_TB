// index.js
function getMessage() {
    return "Hello World depuis ma VM !";
  }
  

  if (require.main === module) {
    console.log(getMessage());
  }
  
  module.exports = { getMessage };
  
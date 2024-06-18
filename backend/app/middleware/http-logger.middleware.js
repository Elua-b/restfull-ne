    const morgan = require("morgan");
const httpLogger = morgan("tiny", {
  skip: (req, res) => res.statusCode < 400,
});
module.exports.httpLogger=httpLogger
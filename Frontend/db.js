var mysql = require('mysql');
var bluebird = require('bluebird');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 8889,
  database: 'sweetbakery'
})

conn.connect(function (error) {
  if (error) throw error;
  console.log("connected to database!")

})
bluebird.promisifyAll(conn);
module.exports = conn;

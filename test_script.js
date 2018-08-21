const pg = require("pg");
const settings = require("./settings");

const arg = process.argv[2];

const client = new pg.Client({
  user:     settings.user,
  password: settings.password,
  database: settings.database,
  host:     settings.hostname,
  port:     settings.port,
  ssl:      settings.ssl
});

client.connect((err) => {
  if (err) return console.error("Connection Error", err);
});

function getPeopleWithName(name, callback){
  client.query(`
    SELECT *
      FROM famous_people
      WHERE first_name=$1::text
      OR last_name=$1::text`, [arg], (err, res) => {
        if (err) callback(err);
        callback(null, res.rows)
  });
}

function endConnection(){
  client.end();
}

getPeopleWithName(arg, (err, res) =>{
  if (err) console.log(err);
  res.forEach(row => {
    console.log(row);
  });
  endConnection();
});
const settings = require("./settings");

const knex = require("knex")({
  client: 'pg',
  connection: settings
});

const args = process.argv.slice(2);
if (args.length < 3){
  console.error(`Usage: node add_person.js <first name>
      <last name> <date of birth DD-MMM-YYYY>`);
  return;
} else {
  console.log("Else statement initiating...")
  const firstName = args[0];
  const lastName = args[1];
  const dateOfBirth = args[2];

  knex("famous_people").insert({
    first_name: firstName,
    last_name: lastName,
    birthdate: dateOfBirth
  }).then((res) => {
    console.log(res);
    knex.destroy()
  });

}



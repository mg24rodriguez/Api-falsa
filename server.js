const express = require('express')
const app = express()
const port = 3001;

const { faker } = require('@faker-js/faker');

const user = [
    faker.datatype.number(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.phone.phoneNumber(),
    faker.internet.email(),
    faker.internet.password(),
];

const companies = [
    faker.datatype.number(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.phone.phoneNumber(),
    faker.internet.email(),
    faker.internet.password(),
];

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get("/api/users", (req, res) => {
    res.json({user});
});

app.get("/api/users/company", (req, res) => {
    res.json({user, companies});
});

app.get("/api/companies", (req, res) => {
    res.json({companies});
});

app.get("/api/users/new", (req, res) => {
    res.json({user});
});

app.get("/api", (req, res) => {
    res.json({ message: "Fake Api with faker.js" });
});

app.post("/api/users", (req, res) => {
    // req.body will contain the form data from Postman or from React
    console.log(req.body);
    // we can push it into the users array for now...
    // later on this will be inserted into a database
    users.push(req.body);
    // we always need to respond with something
    res.json( { status: "ok" } );
});

// if we want to get a user with a specific id, we can make the id a part of the url
// be sure to preface the id variable with a `:` colon
app.get("/api/users/:id", (req, res) => {
    // we can get this `id` variable from req.params
    console.log(req.params.id);
    // assuming this id is the index of the users array we could return one user this way
    res.json( users[req.params.id] );
});

app.put("/api/users/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const id = req.params.id;
    // assuming this id is the index of the users array we can replace the user like so
    users[id] = req.body;
    // we always need to respond with something
    res.json( { status: "ok" } );
});

app.delete("/api/users/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const id = req.params.id;
    // assuming this id is the index of the users array we can remove the user like so
    users.splice(id, 1);
    // we always need to respond with something
    res.json( { status: "ok" } );
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );
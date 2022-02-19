const express = require('express')
const app = express()
const port = 3001;

const { faker } = require('@faker-js/faker');

class User {
    constructor() {
        this.datatype = faker.datatype.number();
        this.name = faker.name.firstName();
        this.name = faker.name.lastName();
        this.phone = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}
console.log(new User());
const user = new User();

class Company {
    constructor() {
        this.number = faker.datatype.number();
        this.name = faker.name.firstName();
        this.address = faker.address.streetAddress();
        this.streetName = faker.address.streetName();
        this.cityName = faker.address.cityName();
        this.state = faker.address.state();
        this.zipCode = faker.address.zipCode()
        this.country = faker.address.county()
    }
}
console.log(new Company());
const company = new Company();


app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get("/api/users", (req, res) => {
    res.json({user});
});

app.get("/api/users/company", (req, res) => {
    res.json({user, company});
});

app.get("/api/companies", (req, res) => {
    res.json({company});
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
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const {DB_HOST, PORT} = process.env;

describe("test user routes", () => {
    let server;
    beforeAll(() => server = app.listen(PORT));
    afterAll(()=> server.close());

    beforeEach((done)=> {
        mongoose.connect(DB_HOST).then(() => done())
    });

    afterEach((done)=> {
            mongoose.connection.close(() => done())
    });

    test("test login route", async() => {
        const newUser = {
            email: 'qwea@gmail.com',
            password: '123456'
        };

        const user = await User.create(newUser);
        console.log(user);

        const loginUser = {
            email: "qwea@gmail.com",
            password: "123456"
        };

        const response = await request(app).post("/api/users/login").send(loginUser);
        console.log(response);
    });
});

const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const {DB_TEST_HOST, PORT} = process.env;

describe("test user routes", () => {
    let server;
    beforeAll(() => server = app.listen(PORT));
    afterAll(()=> server.close());

    beforeEach((done)=> {
        mongoose.connect(DB_TEST_HOST).then(() => done())
    });

    afterEach((done)=> {
        // mongoose.connection.db.dropCollection(() => {
            mongoose.connection.close(() => done())
        // })
    });

    test("test register route", async() => {
        const newUser = {
            email: 'qwea@gmail.com',
            password: '123456',
            verificationToken: true,
        };

        const user = await User.create(newUser);
        console.log(user);
    });
});
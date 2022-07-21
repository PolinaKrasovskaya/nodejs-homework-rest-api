const { login } = require("./index");

test("Login test", async () => {
  const mReq = { body: { email: "qwea@email.com", password: "123456" } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  await login(mReq, mRes);

  expect(mRes.status).toBeCalledWith(200);
  expect(mRes.token).toEqual(expect.anything());
  expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
  expect(mRes.send.user.password).toEqual(
    expect.not.stringContaining(expected)
  );
});
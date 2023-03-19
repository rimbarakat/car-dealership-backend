const { hashPassword, verify } = require("../utils/hash");

const password = "password123";
describe("authentication test", function () {
  it("should verify that a given password is validated against the hash", async function () {
    const hashed = await hashPassword(password);
    const isVerified = await verify(password, hashed);
    expect(isVerified).toBe(true);
  });
  it("should not verify that a given password is validated against the hash", async function () {
    const wrongPassword = "password1234";
    const hashed = await hashPassword(password);
    const isVerified = await verify(wrongPassword, hashed);
    expect(isVerified).toBe(false);
  });

});

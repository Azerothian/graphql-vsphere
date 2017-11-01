import expect from "expect";

import createSchema from "../index";
const dotenv = require("dotenv");

it("env to eq root", async() => {
  const schema = await createSchema({
    username: process.env.VS_USERNAME,
    password: process.env.VS_PASSWORD,
    host: process.env.VS_HOST,
    disableSSLValidation: true,
  });
  expect(process.env.VS_USERNAME).toBe("root");
});

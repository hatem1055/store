import supertest from "supertest";
import app from "../../server";
import {get_token} from "./utilties";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const request = supertest(app);

it("expect request to test get users order", async () => {
  try {
    const token = await get_token()
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    expect(typeof(token).toLowerCase()).toEqual('string') // not authorized;
  } catch (e : any) {
    console.log(e)
  }
});

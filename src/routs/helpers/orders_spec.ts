import supertest from "supertest";
import app from "../../server";
import {get_token} from "./utilties";
const request = supertest(app);

it("expect request to test get users order", async () => {
  try {
    const token = await get_token()
    const r = await request.get("/user_orders").set({
      authorization : `Bearer ${token}`
    })
    expect(r.statusCode).toEqual(200);
  } catch (e : any) {
    console.log(e)
  }
});
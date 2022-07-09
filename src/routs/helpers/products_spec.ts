import supertest from "supertest";
import app from "../../server";
import {get_token} from "./utilties";

const request = supertest(app);

it("expect request to test unauthrized request to return 401 error", async () => {
  try {
    await request.post("/product").send({
        'name' : 'test',
        'price' : 10
    });
  } catch (e : any) {
    expect(e.response.status).toEqual(401) // not authorized;
  }
});
it("expect product post request to return 200 respone", async () => {
    try {
      const token = await get_token()
      const r = await request.post("/product").set({
        authorization : `Bearer ${token}`
      }).send({
          'name' : 'test',
          'price' : 10
      });
      expect(r.statusCode).toEqual(200)
    } catch (e : any) {
      console.log(e)
    }
  });
  it("expect product get request to return 200 respone", async () => {
    try {
      const r = await request.get("/product")
      expect(r.statusCode).toEqual(200)
    } catch (e : any) {
      console.log(e)
    }
  });

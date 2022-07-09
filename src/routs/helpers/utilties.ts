import supertest from "supertest";
import app from "../../server";
const request = supertest(app);

export async function get_token() : Promise<string> {
    const token = await request.post('/user').send({
        'username' : 'hatem',
        'password' : 'test'
      })
      return token.text
}
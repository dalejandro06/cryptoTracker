/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
class Http {
  static instance = new Http();
  async get(url) {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (error) {
      console.error('Http GET method error', error);
      throw new Error(error);
    }
  }
  async post(url, body) {
    try {
      const req = await fetch(url, {
        method: 'POST',
        body
      });
      const json = await req.json();
      return json;
    } catch (error) {
      console.error('Http POST method error', error);
      throw new Error(error);
    }
  }
}

export default Http;

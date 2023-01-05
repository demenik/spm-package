export default class _Request {
  request: Request;

  constructor(
    url: string,
    method = "GET",
    headers: Record<string, string> = {}
  ) {
    this.request = new Request(url);
    this.request.method = method;
    this.request.headers = headers;
  }

  checkStatus(req: Request) {
    const response = req.response;

    if (response.statusCode >= 400) {
      throw new Error(
        `Request failed with status code ${response.statusCode} for ${response.url}`
      );
    } else if (response.statusCode >= 300) {
      throw new Error(
        `Request redirected with status code ${response.statusCode} for ${response.url}`
      );
    } else if (response.statusCode >= 200) {
      return;
    } else {
      throw new Error(
        `Request failed with unknown status code ${response.statusCode} for ${response.url}`
      );
    }
  }

  async loadJSON() {
    const req = this.request;
    const response = await req.loadJSON();
    this.checkStatus(req);
    return response;
  }

  async loadString() {
    const req = this.request;
    const response = await req.loadString();
    this.checkStatus(req);
    return response;
  }
}

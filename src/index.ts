(function(_w: Window) {
  if (!_w.fetch) {
    return;
  }

  const f = (fetch: Function) => (
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> => {
    log(input, init);
    return fetch(input, init);
  };

  _w.fetch = f(_w.fetch);
})(window);

enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE"
}

function log(input: RequestInfo, init?: RequestInit | undefined): void {
  if (!init) {
    console.log(`curl -X GET "${input}"`);
    return;
  }
  const method = init.method || HttpMethod.Get;

  const headers = (headers: any | undefined): string[] => {
    if (!headers) return [];
    return Object.keys(headers).map((key: string) => {
      const value: string = headers[key];
      return `-H "${key}: ${value}"`;
    });
  };

  const body = (body: any | undefined): string[] => {
    if (!body) return [];
    return Object.keys(body).map((key: string) => {
      const value: string = body[key];
      return `-d "${key}: ${value}"`;
    });
  };

  const style = "color: #ec9439; font-weight: bold";
  const command =
    `curl -X ${method}` +
    (body.length > 0 ? `${body(init.body).join("")} ` : "") +
    (headers.length > 0 ? `${headers(init.headers).join("")} ` : "") +
    `"${input}"`;
  console.log(`%c ${command}`, style);
}

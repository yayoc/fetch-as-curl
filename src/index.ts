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

  const bannerStyles = [
    "display: block",
    "background: #03A9F4",
    "padding: 10px 5px",
    "line-height: 40px",
    "text-align: center",
    "font-size:15px",
    "font-weight: bold"
  ];
  console.log("%c welcome fetch-as-curl", bannerStyles.join(";"));
  _w.fetch = f(_w.fetch);
})(window);

enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE"
}

const getCommands = (
  input: any | undefined,
  template: (key: string, value: string) => string
): string[] => {
  if (!input) return [];
  return Object.keys(input).map((key: string) => {
    const value: string = input[key];
    return template(key, value);
  });
};

const getHttpMethod = (init: RequestInit | undefined): string =>
  init ? init.method || HttpMethod.Get : HttpMethod.Get;

export const getCurlCommand = (
  input: RequestInfo,
  init?: RequestInit | undefined
): string => {
  if (!init) {
    return `curl -X GET "${input}"`;
  }
  const method = getHttpMethod(init);
  const headers = getCommands(
    init.headers,
    (key, value) => `-H "${key}: ${value}"`
  );
  const body = getCommands(init.body, (key, value) => `-d "${key}: ${value}"`);

  return (
    `curl -X ${method} ` +
    (body.length > 0 ? `${body.join("")} ` : "") +
    (headers.length > 0 ? `${headers.join("")} ` : "") +
    `"${input}"`
  );
};

function log(input: RequestInfo, init?: RequestInit | undefined): void {
  const command = getCurlCommand(input, init);
  console.groupCollapsed(`${getHttpMethod(init)}: ${input}`);
  const commandStyle = "color: white; background: green; display: block;";
  console.log(`%c ${command}`, commandStyle);
  console.groupEnd();
}

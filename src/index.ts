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
    "background: #35A7FF",
    "color: #FFE74C",
    "padding: 10px 5px",
    "line-height: 60px",
    "text-align: center",
    "font-size:18px",
    "font-weight: bold"
  ];
  console.log("%cfetch-as-curl", bannerStyles.join(";"));
  _w.fetch = f(_w.fetch);
})(window);

enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE"
}

const getHeaders = (input: any | undefined): string[] => {
  if (!input) return [];
  return Object.keys(input).map((key: string) => {
    const value: string = input[key];
    return `-H "${key}: ${value}"`;
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
  const headers = getHeaders(init.headers);

  return (
    `curl -X ${method} ` +
    (headers.length > 0 ? `${headers.join(" ")} ` : "") +
    (init.body ? `-d "${init.body}" ` : "") +
    `"${input}"`
  );
};

function log(input: RequestInfo, init?: RequestInit | undefined): void {
  const command = getCurlCommand(input, init);
  console.groupCollapsed(`${getHttpMethod(init)}: ${input}`);
  const commandStyle = "color: #000; display: block; line-height: 30px;";
  console.log(`%c ${command}`, commandStyle);
  console.groupEnd();
}

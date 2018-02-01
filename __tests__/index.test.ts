import { getCurlCommand } from "../src";

describe("getCurlCommand", () => {
  const url = "https://example.com/api";
  describe("only pass a url", () => {
    test("return a cURL command", () => {
      expect(getCurlCommand(url)).toBe(`curl -X GET "${url}"`);
    });
  });
  describe("pass options", () => {
    test("changing http method POST", () => {
      const options = {
        method: "POST"
      };
      expect(getCurlCommand(url, options)).toBe(`curl -X POST "${url}"`);
    });

    test("changing http method DELETE", () => {
      const options = {
        method: "DELETE"
      };
      expect(getCurlCommand(url, options)).toBe(`curl -X DELETE "${url}"`);
    });

    test("append headers", () => {
      const options = {
        headers: {
          Authorization: "Bearer foo"
        }
      };
      expect(getCurlCommand(url, options)).toBe(
        `curl -X GET -H "Authorization: Bearer foo" "${url}"`
      );
    });

    test("append multiple headers", () => {
      const options = {
        headers: {
          Authorization: "Bearer foo",
          host: "localhost"
        }
      };
      expect(getCurlCommand(url, options)).toBe(
        `curl -X GET -H "Authorization: Bearer foo" -H "host: localhost" "${url}"`
      );
    });

    describe("POST", () => {
      const body = {
        param1: "value1",
        param2: "value2"
      };
      const basicOptions = {
        method: "POST"
      };
      test("with application/x-www-form-urlencoded header", () => {
        const options = Object.assign({}, basicOptions, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: Object.keys(body)
            .map(key => `${key}=${encodeURIComponent(body[key])}`)
            .join("&")
        });
        expect(getCurlCommand(url, options)).toBe(
          `curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2" "${url}"`
        );
      });
      test("with application/json", () => {
        const options = Object.assign({}, basicOptions, {
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        expect(getCurlCommand(url, options)).toBe(
          `curl -X POST -H "Content-Type: application/json" -d \"{\"param1\":\"value1\",\"param2\":\"value2\"}\" "${url}"`
        );
      });
    });
  });
});

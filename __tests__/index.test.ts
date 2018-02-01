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
  });
});

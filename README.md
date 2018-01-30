# fetch-as-curl

Making cURL command output.

## Fetures

* Make a cURL command per fetch function.
* Same interface with fetch API.
* Only work on development.

## Example

```js
import "fetch-as-curl";
const options = {
  method: "POST",
  body: {
    rating: 5,
    comment: "cool!"
  },
  headers: {
    Authorization: "Bearer foo",
    "Content-Type": "application/json"
  }
}
fetch("http://somesite.com/reviews", options)
  .then(res => /* Do something */)
```

> In console

```sh
curl -X POST -H "Authorization: Bearer foo" -H "Content-Type: application/json" -d '{"rating": 5, "comment": "cool!"}' http://somesite.com/some.json
```
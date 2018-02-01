# fetch-as-curl

Making [cURL](https://curl.haxx.se/) command output on browser console when using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Fetures

* Make a cURL command on browser console.
* Same interface with Fetch API.

## Installation

Using `npm`.  
`npm i fetch-as-curl`

## Example

```js
import "fetch-as-curl";
const options = {
  method: "POST",
  body: JSON.stringify({
    rating: 5,
    comment: "cool!"
  }),
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

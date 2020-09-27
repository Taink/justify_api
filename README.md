# justify_api
An simple API that accepts text as input and justifies it as output.  
Currently hosted under [Glitch](https://taink-justify-api.glitch.me/).

## Routes
### /api/token
You should `PUSH` to this endpoint with your email in a `application/json` Content-Type:
```http
POST /api/token HTTP/1.1
Host: taink-justify-api.glitch.me
Content-Type: application/json

{
    "email": "me@example.com"
}
```
You should then receive a response such as:
```http
200 OK
Content-Type: application/json

{
    "token": "your.authtoken.here"
}
```
This token is needed in order to authenticate and access the next route, `/api/justify`
### /api/justify
This endpoint requires you to get a token from `/api/token`, and should output your text justified at a 80 characters limit.  
You should `PUSH` to this endpoint with your text in a `text/plain` Content-Type:
```http
POST /api/justify HTTP/1.1
Host: taink-justify-api.glitch.me
Authorization: Bearer your.authtoken.here
Content-Type: text/plain

The text you want to justify would go here
```
The response should be the same text, justified with each line capped at 80 characters.

## Potential Improvements
First and foremost, this API needs to have rate limits implemented. I have never done such a thing and it would require some time before I could actually do it.
What was planned at first was to add a rate limit to the `/api/justify` route in order to limit the number of words one could submit to the API at 80'000 words
per token per day. I have done some research in rate limiting algorithms and concluded the [Sliding window counter](https://blog.logrocket.com/rate-limiting-node-js/)
would be the most fitting one. I have no idea of how to implement it correctly, though.  
I have done no tests at all, and should implement that aswell.  
Finally I should restructure the code to accomodate for other databases than MongoDB.
Currently the [auth service](https://github.com/Taink/justify_api/blob/master/src/services/auth.ts) relies too heavily on it,
and I should for example implement a database interface that would create some higher-level methods to use instead of using mongoose-specific methods.  
Also maybe the code could be restructured in some way, this was my first try at a "nicely-structured" api (one that doesn't go into a single file, that is)
so it might need some restructuring.

## Contributing
Any issue/PR is welcome! I'm still learning a lot in the domain of authentication and rate limits so any pointers are welcome, too!  
In order to contribute, you should fork this repository and submit a pull request. I'll gladly read what changes can be made.  
In order to run this, you would need to first install the dependencies with `npm i` and then start the project with `npm run start`, which should
both compile the typescript and start the project.
Remember to read the [.env.example](https://github.com/Taink/justify_api/blob/master/.env.example) file I provided to know about what environment
variables this project requires!

## Notes
The actual justifying algorithm I implemented realies **heavily** on the code written in [this video](https://youtu.be/GqXlEbFVTXY), so kudos to
[Michael Muinos](https://github.com/MichaelMuinos) for his video and great explanation!

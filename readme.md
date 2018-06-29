# One hundred lines of code challenge

Many online forums allow users to have signature which appears bellow every users post. This repo is an uber simple Node.js powered Express.js server that will return an image containing the Halo 5 statistics for a specifc XBox Live Gamer Tag.

The front end of the application is only for user convenience. The real value is the image manipulation in `index.js` file.

The `index.js` file is an Express application that serves up front end and generates an image of a players Halo 5 statistics for specific xbox live gamer tag. For example visiting `http://localhost:8080/api/git%20push%20master/image.jpg` will return:

![sample of git push master halo 5 statistics](https://github.com/estepanov/hundred-line-halo-image-stats/blob/master/sample.jpg)

## Configuration

You will need to populate the `.env` file with the appropriate Halo 5 Stats API keys and a server port. You can get these API keys at https://developer.haloapi.com/

## Development

In the root of the project folder create a `.env` file and populate that file with the following details:

```text
PORT=8080
PRIMARY_KEY=
SECONDARY_KEY=
```

> Note that if you change the port, then the front end webpack dev server port also needs to be updated.

After running `yarn` or `npm install` to install dependencies you can launch the dev build by running:

```sh
yarn dev
```

or

```sh
npm run dev
```

The `dev` script will launch the backend with nodemon and the front end with webpack dev server so it auto reloads when there are changes.

## Deployment

This really is not production ready as the images do ___NOT___ cache. This means every request will make multiple calls to the Halo Stats API. They have clearly stated their API has a 10 requests per 10 seconds limit. To use this in a real production enviroment you would need to cache the generated image and setup a schedule for clearing that cache.

With all of that being said, when you want to deploy this first you need to run the build script for the front end:

```sh
yarn build
```

or

```sh
npm build
```

and then you can start the server:

```sh
yarn start
```

or

```sh
npm start
```

## Inspiration

I am a big fan of the Halo video game series. Having been a member, moderator, and admin of numerous video game communities in the past, I was inspired to create a dynamic script that could generate a custom signature containing a gamers statistics.

## How this works

This was my first time using [Jimp](https://github.com/oliver-moran/jimp), short for `JavaScript Image Manipulation Program`. The core index file loads a background image, then begins querying data (JSON) and images. This was tricky because querying the Halo API requiries attaching custom headers with your API key while `Jimp` does not allow setting custom headers for remote file requests. The loading and overlaying of JSON data was simple and straightforward. The loading and ovelaying of images was more complicated. I had to use `Axios` to make the request with the custom header and instruct `Axios` to return an `arraybuffer` data which can be used in `Jimp`.

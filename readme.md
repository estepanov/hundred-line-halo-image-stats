# One hundred lines of code challenge

Many online forums allow users to have signature which appears bellow every users post. This repo is an uber simple Node.js powered Express.js server that will return an image containing the Halo 5 statistics for a specifc XBox Live Gamer Tag.

The front end of the application is only for user convenience. The real value is the image manipulation in `index.js` file.

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

This really is not production ready as the images do _NOT_ cache. This means every request will make multiple calls to the Halo Stats API. They have clearly stated their API has a 10 requests per 10 seconds limit. To use this in a real production enviroment you would need to cache the generated image and setup a schedule for clearing that cache.

With all of that being said, when you want to deploy this run:

```sh
yarn start
```

or

```sh
npm start
```

## Inspiration

I am a big fan of the Halo video game series. Having been a member, moderator, and admin of numerous video game communities in the past, I was inspired to create a dynamic script that could generate a custom signature containing a gamers statistics.

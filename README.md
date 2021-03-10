# Face-to-face front-end server

> Have great conversations

A web app for taking notes, action items and follow-ups during 1-1 meetings.

### Features

- Plain-text note taking with keyboard shortcuts
- Simple so you can take notes faster
- Each conversation pulls up previous follow-up items
- Cross-reference action items in other peoples' one-on-ones
- Or assign action items to your own agenda
- Person switcher

### Technology

- React and TypeScript for front-end (`f2f` repo)
- NestJS and TypeScript for back-end and ORM (`f2f-server` repo)
- MySQL for data-store (old habits die hard; I'd rather do DB ops on a platform I'm very familiar with)

## Getting started

### Install NodeJS

https://nodejs.org/en/download/

### Install packages

    $ npm install

### Set up environment

Point to your f2f-server application

    $ export REACT_APP_F2F_SERVER_ENDPOINT=<f2f_server_endpoint>

(defaults to localhost:3001)

### Start app

Ensure `f2f-server` is running. Then issue:

    $ npm run start

## Cloud

The application is hosted via AWS Amplify. Configure it as follows:

Reference: https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/

* Navigate to AWS Amplify console: https://console.aws.amazon.com
* Chose 'Deploy - Get Started'
* Connect to GitHub repository and authorise AWS Amplify with GitHub
* Choose app name: f2f
* Expand 'Advanced Settings' and enter environment variables:
    * REACT_APP_F2F_SERVER_ENDPOINT: This should correspond with the endpoint of your Lambda deployment of f2f-server; see f2f-server README.md for more info
    * Specifying these via environment variables enables you to create different isolated environments, such as dev, test, production and so forth
* Save and deploy
* Watch as pipeline progresses through to a verified deployment; takes but a moment.
* The endpoint is then displayed on the same screen; e.g. `https://master.dlv3ov0xpf9yl.amplifyapp.com/`

At this point, the app should be working and accessible in your web browser.

# Create react app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

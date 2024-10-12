# United States Aquariums

https://github.com/do-community/us-aquarium-search/assets/6799474/cbcdbf82-ba7b-4c8b-82da-6bf89fbab115

**Note:** Following these steps may result in charges for the use of DigitalOcean services.

## Table of Contents

- [Requirements](#requirements)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Requirements

- You need a DigitalOcean account. If you do not already have one, first [sign up](https://cloud.digitalocean.com/registrations/new?utm_team=devrel&utm_source=github&utm_content=signup).

- Latest version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.

## Description

This [sample app](https://oyster-app-rpxke.ondigitalocean.app/) demonstrates how to use React in a NextJS app to create a search and filter feature for a list of _some_ aquariums in the United States. The app uses the `useState` hook to filter the list of aquariums based on the user's input in the search bar.

The [sample app](https://oyster-app-rpxke.ondigitalocean.app/) combines [DigitalOcean's MongoDB Managed Database](https://www.digitalocean.com/products/managed-databases-mongodb?utm_team=devrel&utm_source=github&utm_content=managed-databases-mongodb) and Compass to store the list of aquariums and is mapped over and displayed using [Material UI components](https://mui.com/material-ui/).

[Autoscaling](https://www.digitalocean.com/blog/introducing-cpu-based-autoscaling-app-platform?utm_team=devrel&utm_source=github&utm_content=blog) is also enabled in the deployed app to ensure that the app can handle increased traffic. To learn more about autoscaling, see the [Autoscaling video from Bikram Gupta](https://www.youtube.com/watch?v=k8pCGYPeqOQ).

## Installation

### Deploy the App

Click the following button to deploy the app to App Platform. If you are not currently logged in with your DigitalOcean account, this button prompts you to to log in.

Once in the console you can choose other services such as Database, Droplets, Autoscaling, and more!

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://do-community: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@github.com/do-community/us-aquarium-search/tree/main)

Note that, for the purposes of this tutorial, this button deploys the app directly from DigitalOcean's GitHub repository, which disables automatic redeployment since you cannot change our template. If you want automatic redeployment or you want to change the sample app's code to your own, we instead recommend you fork [our repository](https://github.com/do-community/us-aquarium-search/tree/main).

To fork our repository, click the **Fork** button in the top-right of [its page on GitHub](https://github.com/do-community/us-aquarium-search/tree/main), then follow the on-screen instructions. To learn more about forking repos, see the [GitHub documentation](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

After forking the repo, you can view the same README in your own GitHub org; for example, in `https://github.com/<your-org>/us-aquarium-search`. To deploy the new repo, visit the [control panel](https://cloud.digitalocean.com/apps) and click the **Create App** button. This takes you to the app creation page. Under **Service Provider**, select **GitHub**. Then, under **Repository**, select your newly-forked repo. Ensure that your branch is set to **main** and **Autodeploy** is checked on. Finally, click **Next**.

After clicking the **Deploy to DigitalOcean** button or completing the instructions above to fork the repo, follow these steps:

1. Configure the app, such as by specifying HTTP routes, declaring environment variables, autoscaling setup, or adding a database. For the purposes of this tutorial, this step is optional.
2. Provide a name for your app and select the region to deploy your app to, then click **Next**. By default, App Platform selects the region closest to you. Unless your app needs to interface with external services, your chosen region does not affect the app's performance, since to all App Platform apps are routed through a global CDN.
3. On the following screen, leave all the fields as they are and click **Next**.
4. Confirm your plan settings and how many containers you want to launch and click **Launch Basic/Pro App**.

After, you should see a **"Building..."** progress indicator. You can click **View Logs** to see more details of the build. It can take a few minutes for the build to finish, but you can follow the progress in the **Deployments** tab.

Once the build completes successfully, click the **Live App** link in the header and you should see your running application in a new tab, displaying the home page.

### Local Installation (fork)

To install the project, follow these steps:

1. Fork the repository
2. Install the dependencies:

```bash
npm install
```

3. If you are planning on using MongoDB (setup code already in app), make sure to set up the `env` variables so your local development works. Once in the console you will have to set that same `env` variable for the app to build.
   There is a `.env.example` file set up for your MongoDB Connection String if you choose to use it:

```js
MONGODB_URI = '';
```

Run the development server:

```bash
npm run dev
```

## Usage

This sample app uses [NextJS](https://nextjs.org/) and can modified to include any data set that you would like to filter and search through.

### CSS

The CSS can also be modified to fit your design preferences. If you choose to use another CSS framework, you can remove the [Material UI components](https://mui.com/material-ui/) and replace them with the components from the framework you choose.

### Database

You are not limited to **ONLY** using MongoDB but if you do, make sure to set up your MongoDB database and connect it to your app. You can use [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to add the data to your database. MongoDB will not be setup by default, you will have to set up your own database. MongoDB it is not considered a dev database in this case. The video below shows how to setup and add the Mongo instance to your app.

Make sure to add your trusted sources to your database. For more information about that, check out the [How to Secure MongoDB Managed Database Clusters](https://docs.digitalocean.com/products/databases/mongodb/how-to/secure/) docs.

Next to the top of the page where it says "test-db" it says **"Creating..."**. The db is being proivisioned and could take a few minutes. Once it is complete, your db will be ready.

https://github.com/do-community/us-aquarium-search/assets/6799474/a768ea6a-a951-48f6-a026-51733f323c66

If you choose to use another database platform, you can modify the code to connect to your database. To learn more about our Managed Databases, see the [Managed Databases documentation](https://www.digitalocean.com/products/managed-databases?utm_team=devrel&utm_source=github&utm_content=managed-databases).

### Autoscaling

The sample app has autoscaling enabled in the resources. If you choose to use autoscaling, you must have a dedicated instance for the feature to work. By choosing the $49/month dedicated instance, the autoscaling feature is unlocked. You don't have to choose the $49 service, there are cheaper options. This is just for the sample app.

You can set the minimum and maximum container size as well as the CPU Threshold % as you can see by the image below.

![autoscale-screenshot](https://github.com/do-community/us-aquarium-search/assets/6799474/9f7b9781-4451-4af1-a28e-d07528921e6a)

I tested the autoscaling feature by running a load test (200,000 requests) on the app using [hey](https://github.com/rakyll/hey). The app was able to handle the increased traffic and the containers scaled up to meet the demand.
![autoscale feature in app platform](https://github.com/do-community/us-aquarium-search/assets/6799474/ede9c2d5-ef27-40ea-99c0-63fa63cd4a9f)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# freezerApp
Freezer Control App

## Description
I created this app to help me organizing my freezers content. Each item in the freezer has quantity, unit, expiration date and description (optional). The items in the freezers are assigned a freezer and a category.

## Stack breakdown
### Back-end
* Nodejs
* Express
* Typescript
* Supertest and jest for tests
* Postgres database with pg npm package

### Front-end
* Typescript 
* React
* Tanstack
    * Form
    * Query
    * Router
    * Table
* Shadcn
* Tailwind
* Vitest for tests

## Initializing the project
Two installation are required to run this project.

In the project root folder is where the back-end is located. Run the following command to install the dependencies and run the back-end locally use the command:
```
npm i
npm run dev
```

The front-end project is located in ./client. Run the following commands to innstall the dependencies and run the front-end:
```
cd ./client
npm i
npm run dev
```

## .env file
Create a .env file with the following variables:
* PORT: port used to run your back-end
* DATABASE_URL: URL of your postgres database
* CLIENT_URL: URL of where your front-end is being hosted on
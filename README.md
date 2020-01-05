# PollutionApp

## Development server

### Setup

1) Install MongoDB, Node, Angular.

2) `npm install` in the *root dir* and also in */pollution-app-api*

3) Create a database in MongoDb called *pollution-app*, and a collection called *users*

4) Replace [YOUR-KEY] with a Google Maps API Key in /src/index.html (when the repo will be public, I will disable the key present before this commit).

### Run

1) Run the MongoDB server. If installed with brew:

    `brew services start mongodb-community`

2) Run `npm start` from pollution-app-api to run the back-end server

3) Run `ng serve --proxy-config proxy.conf.json` for the front-server. 

4) Navigate to `http://localhost:4200/`.
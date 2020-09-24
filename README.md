# AirMatter

Web App for air quality monitoring with gamification element to entice users to go around and sense the environment.

## Paper

If you use this repo, please cite our *GoodTechs '20* paper.

*On exploiting Gamification for the Crowdsensing of Air Pollution: a Case Study on a Bicycle-based System*

Michael Bosello, Giovanni Delnevo, Silvia Mirri.
[[DOI](https://doi.org/10.1145/3411170.3411256)]
[[Slides](https://www.slideshare.net/MichaelBosello/on-exploiting-gamification-for-the-crowdsensing-of-air-pollution-a-case-study-on-a-bicyclebased-system)]

```
@inproceedings{10.1145/3411170.3411256,
author = {Bosello, Michael and Delnevo, Giovanni and Mirri, Silvia},
title = {On Exploiting Gamification for the Crowdsensing of Air Pollution: A Case Study on a Bicycle-Based System},
year = {2020},
isbn = {9781450375597},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3411170.3411256},
doi = {10.1145/3411170.3411256},
abstract = {},
booktitle = {Proceedings of the 6th EAI International Conference on Smart Objects and Technologies for Social Good},
pages = {205–210},
numpages = {6},
keywords = {human-centered design, crowdsensing, mobile sensor, gamification, air pollution},
location = {Antwerp, Belgium},
series = {GoodTechs '20}
}
```

## Abstract
Cities all over the world struggle with air pollution. With the ever-increasing concentration of people in urban areas, more and more people suffer from the negative effects of air pollutants. Crowdsensing systems are a unique chance to increase the users' awareness of this problem and to provide more fine-grained data to policymakers so that they can adopt appropriate strategies. In this paper, we present a crowdsensing system to collect air pollution in urban and suburban environments through the use of bicycles. It consists of a Web application, enriched with gamification elements, that communicates with a portable low-cost sensor. The user interface of such a system, as well as the adopted gamification mechanisms, has been designed by involving a group of target users, with the aim of better meeting users' preferences and needs, and, then, better engaging them.

## Development server

### Setup

1) Install MongoDB, Node, Angular.

2) `npm install` in the *root dir* **and** also in */airmatter-api*

3) Create a database in MongoDb called *airmatter*, and a collection called *users*

4) Replace [YOUR-KEY] with a Google Maps API Key in /src/index.html (when the repo will be public, I will disable the key present before this commit).

### Run

1) Run the MongoDB server. If installed with brew:

    `brew services start mongodb-community`

2) Run `npm start` from airmatter-api to run the back-end server

3) Run `ng serve --proxy-config proxy.conf.json` for the front-server. 

4) Navigate to `http://localhost:4200/`.

5) [Optional] download and use ngrok for outdoor testing `./ngrok http 4200 -host-header="localhost:4200"`

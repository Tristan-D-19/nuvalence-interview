
## Available Scripts

In the project directory, you can run:

# Local Development 
## Run the following command to run the app locally on port 3000
### `npm start`


# Testing 
Run the following command to run the test suite
### `npm test`


# Build
Run the following to build production optimized code 
### `npm run build`


# Deployment
## To run the app as a docker container you can run the following command to build: 
### `docker build -t address-book` 
 
## To run as a docker container
### `docker run --rm -it -p 8080:80 -e PORT=8000 address-book`

## Google Cloud Buld
To build for cloud, create a project on GCP Console, note the project id for the upcoming steps, then enable the following: 

* Cloud Run API
* Google Container Registry API
* Cloud Build API

Once finished enabling the apis, run the following to use cloud build to build and register the container in the gcp cloud registry


### `gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/address-book`

Once built you can run 
### `gcloud run deploy --image gcr.io/[YOUR_PROJECT_ID]/address-book --platform managed`

Finally navigate to the url + '/index.html' provided upon successful deployment

My sample link is: 
https://nuvalence-interview-7fwtbky62a-ue.a.run.app/index.html

# Summary

For this assignment I wanted to try a new library, shard react and I wanted to make everything feel responsive and inclusive. I approached this project using TDD to ensure quality. I used to react testing library as it had all of the functionality I needed and I tested as an end user making sure the experience was what the app intended. 

I used one route and a modal for accessing the client details. I pulled the users from the api (200 users), store them in local storage for persistence across page refreshes, and I serialized/mapped to users to a data format that matches my application. Once the data was properly marshalled I used a list to display the contacts by their name and using an onclick to open a modal with the contact details. I also added editing functionality to the contact detail page. I added a search box to search for contacts using the query in regex test. 

Overall the implementation was minimal and I would have liked to add in profile photos on each contact. If i was given more time I would have liked to styled the app more and give it some life and some voip mocking to really make the app feel like a phone.  


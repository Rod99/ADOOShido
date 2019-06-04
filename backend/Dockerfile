FROM node:latest
RUN mkdir -p /usr/src/app
#App Directory
WORKDIR /usr/src/app
#Install Dependencies Definitions
COPY package.json /usr/src/app
#Install Dependencies
RUN npm install
# Get all the code needed to run the app
COPY . /usr/src/app
# Expose the port the app runs in
EXPOSE 3000
CMD [ "npm", "start" ]

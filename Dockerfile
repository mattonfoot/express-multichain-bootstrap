FROM node:argon
MAINTAINER Matt Smith

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY lib/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY lib /usr/src/app

CMD ["chmod", "a+x bin/www"]
CMD ["npm", "start"]

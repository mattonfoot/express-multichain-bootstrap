FROM node:latest
MAINTAINER Matt Smith

ADD dist/ /src/dist
WORKDIR /src/dist

RUN ls -al /src/dist

RUN npm install

CMD ["npm", "start"]

FROM node:4.4.4
MAINTAINER Matt Smith

ADD dist/ /src/dist
WORKDIR /src/dist

CMD ["npm", "install"]
CMD ["chmod", "a+x bin/www"]
CMD ["npm", "start"]

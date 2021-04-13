FROM node:15

ENV TZ="America/Toronto"
RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata

# create a workdir
WORKDIR /collector

# add in the files
ADD . /collector

# Install needed dependencies
RUN npm install

# Start app
CMD ["node", "app"]
FROM ubuntu:20.04

# Install Node and npm 
RUN apt-get update
# install curl 
RUN apt-get -y install curl
# get install script and pass it to execute: 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
# and install node 
RUN apt-get -y install nodejs
# and install ping utility
RUN apt-get -y install iputils-ping

# Set workdir
WORKDIR /monitor

# Add in code
ADD . /monitor

# Get npm and nodejs
RUN npm install

# Expose a port
EXPOSE 3000

# Start the node server
CMD ["node", "app"]
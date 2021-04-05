FROM node:15.13.0-alpine3.10

# Set workdir
WORKDIR /monitor

# Add in code
ADD . /monitor

# Get npm and nodejs
RUN npm install

# Run the bash script
RUN ./bash_scripts/main.sh

# Expose a port
EXPOSE 3000

# Start the node server
RUN node app
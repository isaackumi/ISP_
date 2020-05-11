FROM node:10


# Create app directory
WORKDIR /usr/src/app
COPY  package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
EXPOSE 5000
CMD [ "node", "app.js" ]

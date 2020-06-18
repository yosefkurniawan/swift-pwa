FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install
RUN npm run build
# Copying source files
COPY . .

# Running the app
CMD [ "npm", "run", "start" ]
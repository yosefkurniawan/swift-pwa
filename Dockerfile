FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./

# Copying source files
COPY . .

# Build image
RUN yarn install; \
    yarn build; 

EXPOSE 3000
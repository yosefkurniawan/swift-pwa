FROM node:14

#Install pm2
RUN yarn global add pm2;

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Install all dependencies pwa
RUN yarn install;

# Patch pwa
RUN sh patch.sh

# build pwa
RUN yarn build; 

EXPOSE 3000
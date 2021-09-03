FROM node:14

#Install pm2
RUN npm install pm2 -g; \
    pm2 install pm2-logrotate; \
    pm2 set pm2-logrotate:max_size 512M;

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Build image
RUN yarn install; \
    yarn build; 

EXPOSE 3000

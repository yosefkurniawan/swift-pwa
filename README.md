## General Information

This is SwiftPWA base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://pwa.getswift.asia/](https://pwa.getswift.asia/)

Release Note: [Click here](https://github.com/icubeus/swift-pwa/releases)

Latest Stable Version branch: `master` (for more version, please check tags)

Launching Checklist:
- [Full PWA mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/354196) 
- [Checkout Only / PWA Checkout mode Checklist](https://teamwork.icubeonline.com/#/projects/120618/notebooks/362538) 

## Requirements
- NodeJS v14 or higher

## Pre-Installation
### Configurations
1. Open file [swift.config.js](swift.config.js)
2. Edit the host of each environment at these lines:
```
const HOST = {
    local: 'http://localhost:3000'
    dev: '[dev url]',
    stage: '[stage url]',
    prod: '[prod url]',
};
```
3. Edit GraphQl endpoint of each environment at these lines:
```
const graphqlEndpoint = {
    local: '[gql endpoint for local]'
    dev: '[gql endpoint for dev]',
    stage: '[gql endpoint for stage]',
    prod: '[gql endpoint for prod]',
};
```
4. Setup `.env`. See [Setup Environment](#authorization-key) section for more details.
```
ACCESS_KEY="YOUR_ACCESS_KEY"
ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
ALGORITHM=aes-256-cbc
FCM_KEY_SERVER=
FCM_TOPIC=notificationspwa
SESSION_SECRET=asdasdd1212ads12!!!@**DADxx1
NEXT_PUBLIC_ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
NEXT_PUBLIC_ALGORITHM=aes-256-cbc
```
5. Run / Restart the PWA <br />
 **IMPORTANT** : If you running with [pm2](https://pm2.keymetrics.io/) (usually on dev site) and you have just changed the .env, you need to restart the pm2 with added param `--update-env`. Otherwise, new the .env changes will not work! Example `pm2 restart {PROCESS_ID} --update-env` after updating .env file! 

## Installation
You can run the PWA manually run the command or using pm2 or using docker.
### Manually run the command
#### Dev mode
1. Build static assets (do once only for the first time)
```
npm run assets:build
# or
yarn assets:build
```
2. Run it (sample for local environment):
```bash
npm run local
# or
yarn local
``` 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

#### Prod mode
1. Build the static assets and the project
```bash
npm run build
# or
yarn build
```
2. Run it (sample for local environment):
```bash
npm run local:start
# or
yarn local:start
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

### Using [pm2](https://pm2.keymetrics.io/)
The steps are same with the previous one. The only different is on the step number 2. Wrap the command in step number 2 with pm2 command, example:
```
pm2 start yarn --name "[project-name]" --interpreter bash -- dev:start
```

### With Docker
#### Local environment (dev mode): 
1. build: `docker-compose -f ./docker/local/docker-compose.yml build`
2. run: `docker-compose -f ./docker/local/docker-compose.yml up`


Alternatively, build and run in one step: `docker-compose -f ./docker/local/docker-compose.yml up --build`


#### Dev environment (prod mode): 
1. build: `docker-compose -f ./docker/dev/docker-compose.yml build`
2. run: `docker-compose -f ./docker/dev/docker-compose.yml up`

Alternatively, build and run in one step: `docker-compose -f ./docker/dev/docker-compose.yml up --build`

#### Prod environment (prod mode):
1. build: `docker-compose build`
2. run: `docker-composer up`

Alternatively, build and run in one step: `docker-compose up --build`

## The SwiftPWA Cores
### Modules
Click [here](core/modules/README.md) for more detail.
### Helpers
Click [here](core/helpers/readme.md) for more detail.
### Libraries
Click [here](core/lib/readme.md) for more detail.
### Public
Click [here](core/public/readme.md) for more detail.

# Overriding
Do not ever touch files under under [core](core) folder!
Instead, please create `src` folder in the root (if not exists) then put all custom (including overriden files) in this `src` folder.

# PWA Config
Since version 2.5.0 Swift PWA must be get any config from graphql where config can be change from backoffice magento. Detail documentation can be read at [here](https://docs.google.com/document/d/1DaZhkHjANgPfISH8eHS7T2njNCQhty1uORHTZ9fYIDk)

# Note for version <= 2.4.9

## Homepage Setup
In the previous versions, Swift PWA comes with hardcode contents which are sliders, highlighted products list, and highlighted categories.
But we recommend to use CMS Page instead.
To do so please follow this step:
1. Download the sample CMS page from [here](sample/pwa-homepage.csv), then upload/import on Magento backoffice using Firebear feature
2. Update the Swift PWA swift.config.js
    - home ▸ useCmsPage ▸ enable = true
    - home ▸ useCmsPage ▸ identifier = "pwa-homepage" or any CMS identifier you created for PWA Homepage.



# Patches
### How to apply patch file for swift pwa project

1. copy file .patch to folder `./patches`
2. edit file `patch.sh`
3. add list file patch beetweek delimiter text `"Start of line patch"` and `"END of line patch"`
4. example code patch.sh after edit like here
```
...
######################### START of line patch ############################
patch -p1 --forward < patches/fix_loadmore_plp.patch || true
######################### END of line patch ##############################

```

# Authorization Key
Authorization key is a key that is generated by Magento (Backoffice > Systems > Integration). This key is mandatory for PWA to get store configurations from Magento via graphql. GQL query storeConfig requires this key for security purpose.
### How to get authorization key

1. Open Magento backoffice
2. Go to Backoffice > Systems > Integration
3. Fill in the name and current user identity verification (this is backoffice account/admin password)
4. On the API section, select resource access to "All"
5. Click save
6. On the Integrations list, click "Activate" on the key you just created
7. Click Allow
8. Copy the "Access Token" part
9. Create `.env` file in root PWA project by duplicating [.env.example](https://github.com/icubeus/swift-pwa/blob/master/.env.example)
10. Open `.env` file and put the Authorization key you just created in `ACCESS_KEY` variable.
```
ACCESS_KEY="YOUR_ACCESS_KEY"
ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
ALGORITHM=aes-256-cbc
FCM_KEY_SERVER=
FCM_TOPIC=notificationspwa
SESSION_SECRET=asdasdd1212ads12!!!@**DADxx1
NEXT_PUBLIC_ENCRYPTION_KEY=TXAjwm8k53PJG9NacLbyZavvQB2qBh43
NEXT_PUBLIC_ALGORITHM=aes-256-cbc
```

Explanation of variables in .env:
1. ACCESS_KEY = Authorization key to fetch storeConfig (required)
2. ENCRYPTION_KEY = Encryption key to encrypt sensitive data (required)
3. ALGORITHM = Encryption algorithm (required)
4. FCM_KEY_SERVER = Firebase server key (optional)
5. FCM_TOPIC = Firebase topic (optional)
6. SESSION_SECRET = Session secret (required)
7. NEXT_PUBLIC_ENCRYPTION_KEY = Encryption key to encrypt sensitive data (required) -> This is for client side usage, consider make this different from the server side one (`ENCRYPTION_KEY`)
8. NEXT_PUBLIC_ALGORITHM = Encryption algorithm (required) -> This is for client side usage, consider make this different from the server side one (`ALGORITHM`)

# Joyride
This application serves to create a web app where people can publicly offer rides to others on prefixed routes. The intent here is to build a service which creates incentive for people to rideshare, by reducing the cost for the passengers, and covering the gas for the driver. 

## Setup instructions
1. Setup MongoDB credentials
2. Clone repository
3. Create a file inside the `/joyride` folder named `.env`, specifying these variables:
```
MONGO_USER={input}
MONGO_PASSWORD={input}
MONGO_PATH={input}
PORT={input}
PRIVATE_KEY={input}
``` 
4. Run `yarn install` to install all dependencies.
5. `npm run serve` to compile the client side code and start the server.
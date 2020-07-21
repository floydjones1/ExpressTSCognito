import App from './app'

import * as bodyParser from 'body-parser'

import HomeController from './controllers/home.controller'
import AuthController from './controllers/auth.controller'
import ProtectedController from './controllers/protected.controller';

const app = new App({
    port: 5000,
    controllers: [
        new HomeController(),
        new AuthController(),
        new ProtectedController()
    ],
    middleWares: [
      // parse application/json
      // parse application/x-www-form-urlencoded
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
})

app.listen()
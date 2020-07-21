import * as express from 'express'
import { Request, Response } from 'express'
import Cognito from '../services/cognito.service';

class HomeController {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.home)
    }

    home = (req: Request, res: Response) => {
      res.send("success")
    }
}

export default HomeController
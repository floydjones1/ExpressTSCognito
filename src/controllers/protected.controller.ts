import * as express from 'express'
import { Request, Response } from 'express'

import AuthMiddleware from '../middleware/auth.middleware';

class ProtectedController {
  public path = '/protected'
  public router = express.Router()
  private authMiddleware;

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes()
  }

  public initRoutes() {
    this.router.use(this.authMiddleware.verifyToken)
    this.router.get('/secret', this.secret)
  }

  secret = (req: Request, res: Response) => {
    res.send("you can view secret")
  }
}

export default ProtectedController;
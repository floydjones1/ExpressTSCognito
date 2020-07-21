import { Request, Response } from 'express';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

let pems: { [key: string]: any }  = {}

class AuthMiddleware {
  private poolRegion: string = 'ca-central-1';
  private userPoolId: string = 'ca-central-1_ef5bKns1b';

  constructor() {
    this.setUp()
  }

  private verifyToken(req: Request, resp: Response, next): void {
    const { token } = req.body;
    console.log(token)
    if (!token) return resp.status(401).end();

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      resp.status(401).end()
      return
    }
    console.log(decodedJwt)
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];
    console.log(pem)
    if (!pem) {
      resp.status(401).end()
      return
    }
    jwt.verify(token, pem, function (err: any, payload: any) {
      if (err) {
        resp.status(401).end()
        return
      } else {
        next()
      }
    })
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful'
      }
      const data = await response.json();
      const { keys } = data;
        for (let i = 0; i < keys.length; i++) {
          const key_id = keys[i].kid;
          const modulus = keys[i].n;
          const exponent = keys[i].e;
          const key_type = keys[i].kty;
          const jwk = { kty: key_type, n: modulus, e: exponent };
          const pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        console.log("got PEMS")
    } catch (error) {
      console.log(error)
      console.log('Error! Unable to download JWKs');
    }
  }
}

export default AuthMiddleware
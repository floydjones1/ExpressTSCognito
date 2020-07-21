import AWS from 'aws-sdk';
import crypto from 'crypto'

export default class Cognito {
  private config = {
    apiVersion: '2016-04-18',
    region: 'ca-central-1',
  }
  private secretHash = '10j74r0nsekujafhd777t01omagltb34m16mvrb8e3v6rfop7ud3'
  private clientId = '7lkobomofk4vsi2iktb0mdmaeq';

  private cognitoIdentity;

  constructor(){
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
  }

  public async signUpUser(username: string, password: string, userAttr: Array<any>): Promise<boolean> {
    
    var params = {
      ClientId: this.clientId, /* required */
      Password: password, /* required */
      Username: username, /* required */
      SecretHash: this.hashSecret(username),
      UserAttributes: userAttr,
    }

    try {
      const data = await this.cognitoIdentity.signUp(params).promise()
      console.log(data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  public async signInUser(username: string, password: string): Promise<boolean> {
    var params = {
      AuthFlow: 'USER_PASSWORD_AUTH', /* required */
      ClientId: this.clientId, /* required */
      AuthParameters: {
        'USERNAME': username,
        'PASSWORD': password,
        'SECRET_HASH': this.hashSecret(username)
      },
    }

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      console.log(data); 
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  public async confirmSignUp(username: string, code: string): Promise<boolean> {
    var params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity.confirmSignUp(params).promise();
      console.log(cognitoResp)
      return true
    } catch (error) {
      console.log("error", error)
      return false
    }
  }

  public async forgotPassword(username): Promise<boolean> {
    var params = {
      ClientId: this.clientId, /* required */
      Username: username, /* required */
      SecretHash: this.hashSecret(username),
    }

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async confirmNewPassword(username: string, password: string, code: string): Promise<boolean> {
    var params = {
      ClientId: this.clientId, /* required */
      ConfirmationCode: code, /* required */
      Password: password, /* required */
      Username: username, /* required */
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this. cognitoIdentity.confirmForgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private hashSecret(username: string): string {
    return crypto.createHmac('SHA256', this.secretHash)
    .update(username + this.clientId)
    .digest('base64')  
  } 
}
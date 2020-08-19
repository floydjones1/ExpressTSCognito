# ExpressTSCognito
  A backend server configured to point to cognito for authentication
  
 Please follow this video for more information: https://www.youtube.com/watch?v=AQfA7OQEMqg


# Getting started
 1. npm install
 2. modify cognito variables in `src/services/cognito.service.ts`
 3. modify cognito variables in `src/middleware/auth.middleware.ts`


## Available endpoints

#### 1. auth/signup
  Registers a new user and sends a verification code to email/phone number
  
#### 2. auth/signin
  Takes registered username and password and returns secure jwt tokens
  
#### 3. auth/verify
  Takes a username and code to verify registered account

#### 4. auth/forgot-password
  Intiates a forgot password workflow
  
#### 5. auth/confirm-password
  Confirms that old password has changed

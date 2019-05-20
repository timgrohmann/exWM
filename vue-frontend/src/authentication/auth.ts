import * as AmazonCognitoIdentity from "amazon-cognito-identity-js"

import * as AWS from "aws-sdk"

const poolData = {
  UserPoolId: 'eu-west-1_MAdUmMoik', // Your user pool id here
  ClientId: '2k21erv81gk31egkvl79r5umi2' // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

class Auth {

  getCognitoUser(): AmazonCognitoIdentity.CognitoUser | null {
    return userPool.getCurrentUser()
  }

  isLoggedIn(): boolean {
    return !!this.getCognitoUser()
  }

  signIn(username: string, password: string, callback: (error: string | null) => void) {
    let authenticationData = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
    })
    let userData = {
      Username: username,
      Pool: userPool
    }
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationData, {
      onSuccess: (result) => {
        this.updateCredentials()
        callback(null)
      },
      onFailure: (error) => {
        callback(error)
      }
    })
  }

  updateCredentials() {
    let cognitoUser = this.getCognitoUser()
    if (cognitoUser != null) {
      console.debug("Updating AWS credentials")
      cognitoUser.getSession((err: AWS.AWSError, session: AmazonCognitoIdentity.CognitoUserSession) => {
        if (err) {
          console.debug("Could not get Cognito User session", err)
          return
        }
        console.log('session validity: ' + session.isValid())

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
          Logins: {
            'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_MAdUmMoik': session.getIdToken().getJwtToken()
          }
        });

        (AWS.config.credentials as AWS.Credentials).refresh((error) => {
          if (error) {
            console.log("Could not update AWS credentials", error);
          } else {
            console.log('Successfully updated AWS credentials!');
          }
        })
      })
    }
  }
  signOut() {
    let user = this.getCognitoUser()
    if (user) {
      (user as AmazonCognitoIdentity.CognitoUser).signOut()
    }
  }

  getEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      let user = this.getCognitoUser()
      if (user == null) {
        reject()
        return
      }
      user.getSession((err: AWS.AWSError, session: AmazonCognitoIdentity.CognitoUserSession) => {
        if (err || !session.isValid()) {
          reject()
          return
        }
        user!.getUserAttributes((error, attributes) => {
          if (error) {
            reject()
            return
          }
          resolve(attributes!.filter((x) => x.getName() == "email")[0].getValue())
        })
      })
    })
  }
}

let auth = new Auth()
export default auth

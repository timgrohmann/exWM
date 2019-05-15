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
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          return
        }
        console.log('session validity: ' + session.isValid())

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330', // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_MAdUmMoik': session.getIdToken().getJwtToken()
          }
        });

        (AWS.config.credentials as AWS.Credentials).refresh((error) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Successfully logged!');
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
}

let auth = new Auth()
export default auth

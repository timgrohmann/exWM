import * as AmazonCognitoIdentity from "amazon-cognito-identity-js"

const poolData = {
  UserPoolId: 'eu-west-1_MAdUmMoik', // Your user pool id here
  ClientId: '2k21erv81gk31egkvl79r5umi2' // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

export default {
  getCognitoUser(): AmazonCognitoIdentity.CognitoUser | null {
    return userPool.getCurrentUser()
  },
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
        callback(null)
      },
      onFailure: (error) => {
        callback(error)
      }
    })
  },
  signOut() {
    let user = this.getCognitoUser()
    if (user) {
      (user as AmazonCognitoIdentity.CognitoUser).signOut()
    }
  }
}

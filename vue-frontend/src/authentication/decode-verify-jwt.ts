/* Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at
     http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 License for the specific language governing permissions and limitations under the License.
*/

import * as https from "https"
import * as jose from "node-jose"

var region = 'eu-west-1';
var userpool_id = 'eu-west-1_MAdUmMoik';
var app_client_id = '7nqlsl50rmosp3p7c7kcqveli3';
var keys_url = 'https://cognito-idp.' + region + '.amazonaws.com/' + userpool_id + '/.well-known/jwks.json';

export default {
  verify: function (token: string, callback: (error: string | null, payload: any | null) => void) {
    let sections = token.split('.');
    // get the kid from the headers prior to verification
    let header = jose.util.base64url.decode(sections[0]);
    let headerJson = JSON.parse(header);
    let kid = headerJson.kid as string;
    // download the public keys
    https.get(keys_url, (response) => {
      if (response.statusCode == 200) {
        response.on('data', function (body) {
          var keys = JSON.parse(body)['keys'];
          // search for the kid in the downloaded public keys
          var key_index = -1;
          for (var i = 0; i < keys.length; i++) {
            if (kid == keys[i].kid) {
              key_index = i;
              break;
            }
          }
          if (key_index == -1) {
            console.log('Public key not found in jwks.json');
            callback('Public key not found in jwks.json', null);
          }
          // construct the public key
          jose.JWK.asKey(keys[key_index]).
            then(function (result) {
              // verify the signature
              jose.JWS.createVerify(result).
                verify(token).
                then(function (result) {
                  // now we can use the claims
                  var claims = JSON.parse(result.payload.toString());
                  // additionally we can verify the token expiration
                  var current_ts = Math.floor(new Date().getTime() / 1000);
                  if (current_ts > claims.exp) {
                    callback('Token is expired', null);
                  }
                  // and the Audience (use claims.client_id if verifying an access token)
                  if (claims.aud != app_client_id) {
                    //callback('Token was not issued for this audience', null);
                  }
                  callback(null, claims);
                }).
                catch(function () {
                  callback('Signature verification failed', null);
                });
            });
        });
      }
    });
  }
}

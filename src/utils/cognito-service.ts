const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {    
    UserPoolId : process.env.COGNITO_POOL_ID, // Your user pool id here    
    ClientId : process.env.COGNITO_APP_CLIENT_ID // Your client id here
}; 

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = async (userData: any) => {
    try{
    
        return new Promise((resolve, reject) =>{

            var attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:userData.name}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:userData.gender}));

            userPool.signUp(userData.email, userData.password, attributeList, null, function(err: any, result: any){
      
                  if (err) {
                    reject(err)
                  }else{
                      return resolve(result)
                  }
              });
        })
        
    }catch(err){
        throw err;
    }
   
}

const signInUser = async (data: any) => {
    try{

        var authenticationData = {
            Username: data.email,
            Password:  data.password,
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );

        var userData = {
            Username: data.email,
            Pool: userPool
        };
      
        return new Promise((resolve, reject) =>{

            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result: any){
                    var accessToken = result.getAccessToken().getJwtToken();
                    resolve({message: 'success', accessToken})
                },
                onFailure: function(err: any) {
                    console.log(err.message || JSON.stringify(err));
                    reject(err)
                },
            })
        })
        
    }catch(err){
        throw err;
    }
}

const confirmUser = async (data: any) => {
    try{

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username: data.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        return new Promise((resolve, reject)=>{
            cognitoUser.confirmRegistration(data.code, true, function(err: any, result: any) {
                if (err) {
                  reject(err);
                }
                resolve(result);
            });
        })
    }catch(err){
        throw err;
    }
}

export { registerUser, signInUser, confirmUser }
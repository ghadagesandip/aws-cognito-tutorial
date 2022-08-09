const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {    
    UserPoolId : process.env.COGNITO_POOL_ID, // Your user pool id here    
    ClientId : process.env.COGNITO_APP_CLIENT_ID // Your client id here
}; 

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = async (userData: any) => {
    try{
    
        return new Promise((resolve, reject) =>{

            console.log('userData', userData)
            var attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:userData.name}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:userData.gender}));

            userPool.signUp(userData.email, userData.password, attributeList, null, function(err: any, result: any){
                console.log('err: ', err)
                console.log('result: ', result)
      
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

export { registerUser
}
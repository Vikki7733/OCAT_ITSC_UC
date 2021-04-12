let request = require(`request`);
const config = require(`../Config`);

exports.submit = ( login ) => {
    return new Promise((resolve, reject) => {
  
        const options = {
        uri: `http://${ config.api.url}/user/submit/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
        login: login
        },
        json: true
      };
  
      //this function sends a request to the API
      // finish the logic to handle the response when returned from the API
      request(options, (error, response) => {
        if(error == null){
          resolve(response);
        }
        
        if(error != null){
          reject(error);
        }
      });
    });
  };

  exports.signUp = ( signUp ) => {
    return new Promise((resolve, reject) => {
  
        const options = {
        uri: `http://${ config.api.url}/user/signUp/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
        login: signUp
        },
        json: true
      };
  
      //this function sends a request to the API
      // finish the logic to handle the response when returned from the API
      request(options, (error, response) => {
        if(error == null){
          resolve(response);
        }
        
        if(error != null){
          reject(error);
        }
      });
    });
  };
  
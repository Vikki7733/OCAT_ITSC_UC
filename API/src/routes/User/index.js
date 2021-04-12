const { ResponseHandler } = require(`../../utils`);
const { IdentityService } = require(`../../microservices`);

const BASE_URL = `/user`;

module.exports = server => {

    server.post(
        `${ BASE_URL }/submit`,
        async (req, res, next) => {
          try {
    
            const  {login}  = req.params;
            user = await IdentityService.login(login);

            ResponseHandler(
              res,
              'User Login Succeeded',
              user,
              next
            );
          } catch (err) {
            console.log(err)
            next(err);
          }
        }
      );

      server.post(
        `${ BASE_URL }/signUp`,
        async (req, res, next) => {
          try {
    
            const  {login}  = req.params;
            isUserCreated = await IdentityService.signUp(login);
            let message = isUserCreated === 'true'? 'User created successfully':'User not created' ;
            ResponseHandler(
              res,
              message,
              {isUserCreated: isUserCreated},
              next
            );
          } catch (err) {
            console.log(err)
            next(err);
          }
        }
      );
      
};
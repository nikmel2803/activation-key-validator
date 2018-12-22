const axios = require('axios');

axios.get('http://localhost:3000/api/register-program?email=nikmel2803&price=30&purse=new')
    .then(responce => console.log(responce))
    .catch(error => console.log(error));

// const config = {
//     lalala:'lolololo'
// };
// axios.post('http://10.177.0.194:9191/storage', config)
//     .then(responce => console.log(responce))
//     .catch(error => console.log(error));
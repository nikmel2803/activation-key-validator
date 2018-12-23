const axios = require('axios');

// Регистрация программы
// axios.get('http://localhost:3000/api/register-program?email=nikmel2803&price=30&purse=ne123w123')
//     .then(responce => console.log(responce))
//     .catch(error => console.log(error));

// Проверка наличия программы у пользователя
axios.get('http://localhost:3000/api/check?email=nikuser&programId=32b20ac5-c29b-4686-89bf-90c0f41b42d0')
    .then(responce => console.log(responce))
    .catch(error => console.log(error));

// Покупка программы
// axios.get('http://localhost:3000/api/buy?email=nikuser&programId=32b20ac5-c29b-4686-89bf-90c0f41b42d0')
//     .then(responce => console.log(responce))
//     .catch(error => console.log(error));







// const config = {
//     lalala:'lolololo'
// };
// axios.post('http://10.177.0.194:9191/storage', config)
//     .then(responce => console.log(responce))
//     .catch(error => console.log(error));
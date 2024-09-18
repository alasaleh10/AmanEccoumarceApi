const userApi = require('./UserApi');
const bannarApi = require('./BanarApi');
const locationApi = require('./LocationApi');
const categorieeApi = require('./CategorieeApi');

const mountRoutes=(app)=>
    {
app.use('/api/users', userApi);
app.use('/api/banars', bannarApi);
app.use('/api/locations', locationApi);
app.use('/api/categoriees', categorieeApi);
    }

module.exports=mountRoutes;
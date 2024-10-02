const userApi = require('./UserApi');
const bannarApi = require('./BanarApi');
const locationApi = require('./LocationApi');
const categorieeApi = require('./CategorieeApi');
const productApi = require('./ProductApi');
const favoriteApi = require('./FavoriteApi');
const homeApi = require('./HomeApi');
const problemApi = require('./ProblemApi');
const CartApi = require('./CartApi');
const CouponApi = require('./CouponApi');
const mountRoutes=(app)=>
    {
app.use('/api/users', userApi);
app.use('/api/banars', bannarApi);
app.use('/api/locations', locationApi);
app.use('/api/categoriees', categorieeApi);
app.use('/api/products', productApi);
app.use('/api/favorites', favoriteApi);
app.use('/api/home', homeApi);
app.use('/api/problems', problemApi);
app.use('/api/carts', CartApi);
app.use('/api/coupons', CouponApi);
    }

module.exports=mountRoutes;
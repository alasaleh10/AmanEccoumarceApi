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
const OrderApi = require('./OrderApi');
const NotificationApi = require('./NotificationApi');
const RatingApi = require('./RatingApi');
const Users = require('./AdminApi/users');
const CategorieeAdminApi = require('./AdminApi/CategorieeApi');
const ProductsAdminApi = require('./AdminApi/ProductsApi');
const CouponAdminApi = require('./AdminApi/CouponApi');
const NotificationAdminApi = require('./AdminApi/NotificationApi');
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
app.use('/api/orders', OrderApi);
app.use('/api/ratings', RatingApi);
app.use('/api/notifications', NotificationApi);
app.use('/api/admins', Users);
app.use('/api/admins/Categoriees', CategorieeAdminApi);
app.use('/api/admins/Products', ProductsAdminApi);
app.use('/api/admins/Coupons', CouponAdminApi);
app.use('/api/admins/Notifications',NotificationAdminApi)
    }

module.exports=mountRoutes;
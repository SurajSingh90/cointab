
const controller = require('../controller/user')
const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
	windowMs: 24* 60*60 * 1000, // 24 HR
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
module.exports= function(app){
    app.post('/edit/:id',controller.edituser )
    app.post('/register',controller.createuser )
    app.get('/delete/:id',controller.deleteuser )
    app.get('/getall',controller.getalluser )
    app.post('/login',[apiLimiter],controller.loginpage)
 

    
    
    
}



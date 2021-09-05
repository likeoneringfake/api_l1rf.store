const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const uploadRouter = require('./uploadRouter')
const productRouter = require('./productRouter')
const paymentRouter = require('./paymentRouter')
function route(app) {
	app.use('/api/user', userRouter)
	app.use('/api/category', categoryRouter)
	app.use('/api/product', productRouter)
	app.use('/api', uploadRouter)
	app.use('/api/payment', paymentRouter)
}

module.exports = route

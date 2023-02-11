/**
 * Required External Modules
 */
import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import mongoose from "mongoose"
import userRouter from "./routers/User.router"
import blockerRouter from "./routers/Blocker.router"

dotenv.config()

/**
 * App Variables
 */
if (!process.env.PORT || !process.env.MONGODB_URI) {
	console.error(
		"Make sure that the PORT and MONGODB_URI environment variables are defined"
	)
	process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const MONGODB_URI: string = process.env.MONGODB_URI as string

const app = express()

/**
 * Middleware
 */
app.use(helmet())
app.use(cors())
app.use(express.json())

/**
 * Routes
 */
app.use(userRouter)
app.use(blockerRouter)

/**
 * Connect to MongoDB
 * Assign MongoDB as constant
 */
mongoose.connect(MONGODB_URI, (error) => {
	if (error) {
		console.error(`Failed to connect to MongoDB: ${error}`)
		process.exit(1)
	}

	console.log("Connected to MongoDB")
})

/**
 * Start Server
 */
app.listen(PORT, () => {
	console.log(`Started server!`)
	console.log(`Listening on port ${PORT}`)
})
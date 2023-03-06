import express from "express"
import cors from 'cors'
import authRoutes from "./routes/AuthRoutes.js"
import accountRoutes from "./routes/AccountRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use([authRoutes, accountRoutes])

export default app
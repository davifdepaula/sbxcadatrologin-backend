import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from "./routes/AuthRoutes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use([authRoutes])
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

export default app
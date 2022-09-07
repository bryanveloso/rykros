import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ?? '8007'

app.listen(port, () => {
  console.log(`[server]: Listening on http://localhost:${port}`)
})

import colors from "colors"
import mongoose from "mongoose"
import NextCors from "nextjs-cors"
import { NextApiRequest, NextApiResponse } from "next"

export async function connectMongoDB() {
  const mongoURI = process.env.MONGO_URI!
  mongoose.set("strictQuery", false)

  try {
    const db = await mongoose.connect(mongoURI)
    console.log(colors.green(`MongoDB connected: ${db.connection.host}`))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong in connection to MongoDB"
    console.log(`${errorMessage}`.red)
    process.exit(1)
  }
}

export async function allowCors(req: NextApiRequest, res: NextApiResponse<any>) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: "*",
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
}

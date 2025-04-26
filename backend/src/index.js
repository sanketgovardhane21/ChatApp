import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import {app, server} from "./lib/socket.js"
import path from "path"


const __dirname = path.resolve()

app.use(express.json({ limit: '10mb' })); // or even bigger if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

const PORT = process.env.PORT || 5001
server.listen(PORT, ()=> {
    console.log("Server is listening on PORT:"+ PORT)
    connectDB()
})
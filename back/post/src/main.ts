import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { randomUUID } from "crypto"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*",
    })
)

type Post = { id: string; title: string }

const posts: { [key: string]: Post } = {}

app.post("/api/posts", async (req, res) => {
    const post = req.body as { title: string }

    const id = randomUUID()

    posts[id] = {
        id,
        title: post.title,
    }

    await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, { type: "CreatePost", data: posts[id] })

    res.status(201).send(posts[id])
})

app.post("/events", (req, res) => {
    console.log("Event received", req.body.type)

    res.send({})
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})

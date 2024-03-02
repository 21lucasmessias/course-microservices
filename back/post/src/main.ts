import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { randomUUID } from "crypto"
import axios from "axios"

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

    await axios.post("http://localhost:3005/events", { type: "CreatePost", data: posts[id] })

    res.status(201).send(posts[id])
})

app.post("/events", (req, res) => {
    console.log("Event received", req.body.type)

    res.send({})
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})

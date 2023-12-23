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

type Comment = { id: string; comment: string }

const comments: { [key: string]: { id: string; comments: Comment[] } } = {
    "1": {
        id: "1",
        comments: [
            {
                id: "1",
                comment: "Teste comentário 1",
            },
            {
                id: "2",
                comment: "Teste comentário 2",
            },
        ],
    },
    "2": {
        id: "2",
        comments: [
            {
                id: "3",
                comment: "Teste comentário 3",
            },
            {
                id: "4",
                comment: "Teste comentário 4",
            },
        ],
    },
}

app.post("/api/posts/:id/comment", async (req, res) => {
    const id = randomUUID()
    const comment = req.body as Comment
    comment.id = id

    const commentsUpsert = comments[req.params.id].comments || []
    commentsUpsert.push(comment)

    comments[req.params.id].comments = commentsUpsert

    await axios.post("http://localhost:3005/events", {
        type: "CreateComment",
        data: {
            id,
            comment: comment.comment,
            postId: req.params.id,
        },
    })

    res.status(201).send(commentsUpsert)
})

type Post = { id: string; title: string }

app.post("/events", (req, res) => {
    console.log("Event received", req.body.type)

    if (req.body.type === "CreatePost") {
        const post = req.body.data as Post
        comments[req.body.data.id] = {
            id: req.body.data.id,
            comments: [],
        }
    }

    res.send({})
})

app.listen(3001, () => {
    console.log("Listening on 3001")
})

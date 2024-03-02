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

type Comment = { id: string; comment: string; status: "pending" | "declined" | "allowed" }

const postsWithComments: { [key: string]: { id: string; comments: Comment[] } } = {}

app.post("/api/posts/:id/comment", async (req, res) => {
    const id = randomUUID()
    const comment = req.body as Comment
    comment.id = id
    comment.status = "pending"

    const commentsUpsert = postsWithComments[req.params.id].comments || []
    commentsUpsert.push(comment)

    postsWithComments[req.params.id].comments = commentsUpsert

    await axios.post("http://localhost:3005/events", {
        type: "CreateComment",
        data: {
            ...comment,
            postId: req.params.id,
        },
    })

    res.status(201).send(commentsUpsert)
})

app.post("/events", async (req, res) => {
    console.log("Event received", req.body.type, req.body.data)
    console.log(JSON.stringify(postsWithComments))

    if (req.body.type === "CreatePost") {
        postsWithComments[req.body.data.id] = {
            id: req.body.data.id,
            comments: [],
        }
    } else if (req.body.type === "ModerateComment") {
        const comment = postsWithComments[req.body.data.postId].comments.find((comment) => comment.id === req.body.data.id)
        if (comment) {
            comment.status = req.body.data.status

            await axios.post("http://localhost:3005/events", {
                type: "UpdateComment",
                data: {
                    ...comment,
                    postId: req.body.data.postId,
                },
            })
        } else {
            console.log("comment not found")
        }
    }

    res.send({})
})

app.listen(3001, () => {
    console.log("Listening on 3001")
})

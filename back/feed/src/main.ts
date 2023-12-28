import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*",
    })
)

type Comment = { id: string; comment: string; status: "pending" | "declined" | "allowed" }
type Feed = {
    [key: string]: {
        id: string
        title: string
        comments: Comment[]
    }
}

const feed: Feed = {}

app.get("/api/feed", (req, res) => {
    res.status(200).send(feed)
})

type PostEvent = { id: string; title: string }
type CommentEvent = { id: string; comment: string; postId: string; status: "pending" | "declined" | "allowed" }

app.post("/events", (req, res) => {
    console.log("Event received", req.body.type)

    if (req.body.type === "CreatePost") {
        const post = req.body.data as PostEvent
        feed[post.id] = {
            id: req.body.data.id,
            title: post.title,
            comments: [],
        }
    } else if (req.body.type === "CreateComment") {
        const { comment, id, postId, status } = req.body.data as CommentEvent
        const comments = feed[postId].comments

        comments.push({
            id,
            comment,
            status,
        })
    } else if (req.body.type === "UpdateComment") {
        const { comment, id, postId, status } = req.body.data as CommentEvent
        const comments = feed[postId].comments
        const oldComment = comments.find((comment) => comment.id === id)

        if (oldComment) {
            oldComment.comment = comment
            oldComment.status = status
        }
    }

    res.send({})
})

app.listen(3002, () => {
    console.log("Listening on 3002")
})

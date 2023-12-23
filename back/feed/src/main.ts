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

type Comment = { id: string; comment: string }
type Feed = {
    [key: string]: {
        id: string
        title: string
        comments: Comment[]
    }
}

const feed: Feed = {
    "1": {
        id: "1",
        title: "Title 1",
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
        title: "Title 2",
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

app.get("/api/feed", (req, res) => {
    res.status(200).send(feed)
})

type PostEvent = { id: string; title: string }
type CommentEvent = { id: string; comment: string; postId: string }

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
        const comment = req.body.data as CommentEvent
        feed[comment.postId].comments.push({
            comment: comment.comment,
            id: comment.id,
        })
    }

    res.send({})
})

app.listen(3002, () => {
    console.log("Listening on 3002")
})

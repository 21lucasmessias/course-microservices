import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Event, Feed, TypedRequestBody } from "./types"
import axios from "axios"

const feed: Feed = {}

function handleEvent({ type, data }: Event) {
    if (type === "CreatePost") {
        const post = data
        feed[post.id] = {
            id: data.id,
            title: post.title,
            comments: [],
        }
    } else if (type === "CreateComment") {
        const { comment, id, postId, status } = data
        const comments = feed[postId].comments

        comments.push({
            id,
            comment,
            status,
        })
    } else if (type === "UpdateComment") {
        const { comment, id, postId, status } = data
        const comments = feed[postId].comments
        const oldComment = comments.find((comment) => comment.id === id)

        if (oldComment) {
            oldComment.comment = comment
            oldComment.status = status
        }
    }
}

function initServer() {
    const app = express()
    app.use(bodyParser.json())
    app.use(
        cors({
            origin: "*",
        })
    )

    app.get("/api/feed", (req, res) => {
        res.status(200).send(feed)
    })

    app.post("/events", (req: TypedRequestBody<Event>, res) => {
        console.log("Event received", req.body.type)

        handleEvent(req.body)

        res.send({})
    })

    app.listen(3002, () => {
        console.log("Listening on 3002")
    })
}

async function start() {
    const res = await axios.get<Event[]>("http://localhost:3005/events")

    res.data.forEach((event) => {
        handleEvent(event)
    })

    initServer()
}

start()

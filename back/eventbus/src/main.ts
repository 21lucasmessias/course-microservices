import express, { Request } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import axios from "axios"
import { Event, TypedRequestBody } from "./types"

const app = express()
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*",
    })
)

const events: Event[] = []

app.post("/events", async (req: TypedRequestBody<Event>, res) => {
    events.push(req.body)
    try {
        await axios.post("http://localhost:3000/events", req.body)
    } catch (err) {
        console.log(err)
    }
    try {
        await axios.post("http://localhost:3001/events", req.body)
    } catch (err) {
        console.log(err)
    }
    try {
        await axios.post("http://localhost:3002/events", req.body)
    } catch (err) {
        console.log(err)
    }
    try {
        await axios.post("http://localhost:3003/events", req.body)
    } catch (err) {
        console.log(err)
    }

    res.send({})
})

app.get("/events", (req, res) => {
    res.send(events)
})

app.listen(3005, () => {
    console.log("Listening on 3005")
})

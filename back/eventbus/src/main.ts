import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import axios from "axios"

const app = express()
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*",
    })
)

app.post("/events", async (req, res) => {
    await axios.post("http://localhost:3000/events", req.body)
    await axios.post("http://localhost:3001/events", req.body)
    await axios.post("http://localhost:3002/events", req.body)
    await axios.post("http://localhost:3003/events", req.body)
    res.send({})
})

app.listen(3005, () => {
    console.log("Listening on 3005")
})

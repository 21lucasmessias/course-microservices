import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express()
app.use(bodyParser.json())

app.post("/events", (req, res) => {
    console.log("Event received", req.body.type)

    if (req.body.type === "CreateComment") {
        setTimeout(async () => {
            await axios.post("http://localhost:3005/events", {
                type: "ModerateComment",
                data: {
                    id: req.body.data.id,
                    postId: req.body.data.postId,
                    status: "allowed",
                },
            })
        }, 10000)
    }

    res.send({})
})

app.listen(3003, () => {
    console.log("Listening on 3003")
})

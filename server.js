import express from "express";
// This import makes async errors be caught instead of passing silently
import 'express-async-errors';
import {MentorDb} from "./backend/mentorDb.js";

let app = express();

app.use(express.json());
app.use(express.static('frontend'));

app.post('/get_user_info', async (request, response) => {
    let userIdentifier = request.body.userIdentifier;
    let userInfo = await MentorDb.getUserInfo(userIdentifier);
    response.json(userInfo || {});
});

let server = app.listen(process.env.PORT || 8008, () => {
    let {port, address} = server.address();
    if (address === "::") {
        address = "http://localhost"
    }
    console.log(`Mentor is UP! ${address}:${port}`)
});

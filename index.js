const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// get or create user object for username in chat engine database, taking username from request body
// api calls create users, get existing users, fetch users following username or create from scratch if doesn't exist

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  // put call ('route')
  // pass in required endpoint data (username, secret) 
  // pass in header authentication (private key) (to create and destory users) 
  try { 
    const r = await axios.put(
        'https://api.chatengine.io/users/',
        {username: username, secret: username, first_name: username},
        {headers: {"private-key": "d7917225-69a8-41b6-8796-d4d27f0dd657"}}
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);

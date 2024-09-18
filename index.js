require("dotenv").config();
const express = require("express");
const querystring = require("querystring");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const PORT = 3000;
const stateKey = "spotify_auth_state";

app.use(cors());

app.get("/login", function (req, res) {
  let state = uuidv4();
  let scope = "user-read-private user-read-email user-top-read";

  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    return res.redirect(
      "/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  }

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  })
    .then((response) => {
      if (response.status !== 200)
        return res.redirect(
          "/?" + querystring.stringify({ error: "invalid_token" })
        );
      return response.json();
    })
    .then((data) => {
      const { access_token, refresh_token, expires_in } = data;

      //  redirect to react app and pass along tokens and query params

      const queryParams = querystring.stringify({
        access_token,
        refresh_token,
        expires_in,
      });

      res.redirect(`http://localhost:5173?${queryParams}`);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/refresh_token", function (req, res) {
  let refresh_token = req.query.refresh_token;

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  })
    .then((response) => {
      if (response.status !== 200)
        return res.redirect(
          "/?" + querystring.stringify({ error: "error_refreshing_token" })
        );
      return response.json();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(PORT, () => {
  console.log("Listening on port http://localhost:3000");
});

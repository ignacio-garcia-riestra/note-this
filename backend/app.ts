const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express ();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request: any, response: { send: (arg0: { Status: string; }) => void; }) => {
  const status = {
    "Status": "Running"
  };
  
  response.send(status);
});
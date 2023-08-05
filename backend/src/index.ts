import app from "./app";

app.listen(app.get("port"), () => {
    console.log("Server Listening on PORT:", app.get("port"));
  });
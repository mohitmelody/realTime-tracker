const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "./public")));

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected!");
  socket.on("send-location" , function(data){
    io.emit("receive-location" , {id:socket.id , ...data})
  })
  socket.on("disconnect" , function(){
    io.emit("user-disconnected" , socket.id)
  } )
  // You can add more socket.io logic here
});

// Render the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Start the server
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

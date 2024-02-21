
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./config/db.config");

const app = express();


app.use(cors());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(
  cookieSession({
    name: "session",
    keys: ["e74323e486234523482345234523452345234523452345234523452345234523"],
    httpOnly: true
  })
);

const db = require("./models");
const Role = db.role;
const Doctor=db.doctor;

db.mongoose.set('strictQuery', false)
  .connect('mongodb+srv://kadirorhunkavraz:0kE8a5etArYYBvgb@mernappcluster0.1nf2aoq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mernapp application." });
});

// routes
require("./routes/authRoutes")(app);
require("./routes/users")(app);
require("./routes/doctorRoute")(app);
require("./routes/appointmentRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


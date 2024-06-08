let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.file.path,
    });
    await User.insertMany([newUser]);
    res.json({ status: "Success", msg: "Account created successfully" });
  } catch (error) {
    res.json({
      status: "Failure",
      msg: "Unable to create account",
      error: error,
    });
  }
});
app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetailsArr = await User.find().and({ email: req.body.email });
  if (userDetailsArr.length > 0) {
    if (userDetailsArr[0].password === req.body.password) {
      let loggedInDetails = {
        firstName: userDetailsArr[0].firstName,
        lastName: userDetailsArr[0].lastName,
        age: userDetailsArr[0].age,
        email: userDetailsArr[0].email,
        profilePic: userDetailsArr[0].profilePic,
      };
      res.json({ status: "success", data: loggedInDetails });
    } else {
      res.json({ status: "failure", msg: "Invaid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "User does not exist" });
  }
});

app.listen(4444, () => {
  console.log("Listening to port 4444");
});

let connectToMdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeevanrdy:jeevanrdy@skynet.ycaxxus.mongodb.net/ExpressStatic?retryWrites=true&w=majority&appName=SkyNet"
    );
    console.log("Connected to MDB");
  } catch (error) {
    console.log("Unable to connect to MDB");
  }
};

connectToMdb();

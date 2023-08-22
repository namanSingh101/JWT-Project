const wrtUserData = require("../Middleware/wrtUserData");
const { createCustomError } = require("../CustomError/CustomError");
const jwt = require("jsonwebtoken");
const { configDotenv } = require("dotenv");
configDotenv();

const login = (req, res, next) => {
  const { username, password } = req.body;

  if (!req.body) {
    return res
      .status(400)
      .json({ data: " not present", response: "fake response" });
  }
  if (!username || !password) {
    const err = createCustomError("Please provide userName and password", 400);
    return next(err);
  }
  wrtUserData(req.body);
  jwt.sign(
    { id: username },
    process.env.SECRET_KEY,
    { encoding: "utf8", expiresIn: 60 },
    (err, tokenData) => {
      if (err) {
        //console.log("error occured " + err);
        const err = createCustomError("Something Went wrong login denied", 500);
        return next(err);
      }
      //console.log("working fine");
      return res
        .status(200)
        .json({ data: req.body, response: "fake response", token: tokenData });
    }
  );
};

const dashBoard = (req, res, next) => {
  //console.log(req.get("Authorization").split(" ")[1]);

  const token = req.get("Authorization").split(" ")[1];

  if (
    !req.get("Authorization") ||
    !req.get("Authorization").startsWith("Bearer")
  ) {
    const err = createCustomError("Please provide authrization", 401);
    return next(err);
  }

  if (req.get("Authorization").split(" ")[1] === "null") {
    const err = createCustomError("Please provide authrization token", 401);
    return next(err);
  }

  //now verify token
  const verification = jwt.verify(token, process.env.SECRET_KEY, { complete: true })
  //console.log(verification.payload.id);
  if(!verification.payload.id){
    const err = createCustomError("No user present", 404);
    return next(err);
  }
  const luckNumber = Math.floor(Math.random() * 100);
  return res
    .status(200)
    .json({ msg: `hello naman and your lucky number is ` , secret:luckNumber});
};

module.exports = { login, dashBoard };

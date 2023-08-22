const fs = require("fs");

const wrtUserData =  (user) => {
  console.log(user);
  fs.writeFile(
    "./Data/userData.txt",
    `userName:${user.userName} password:${user.password} \n`,
    { flag: "a", encoding: "utf8" },
    (err) => {
        if (err) {
            console.error("error occured in writing file " + err.message);
            return
          }
          console.log("User data written succesfully");
    }
  );
};

module.exports = wrtUserData

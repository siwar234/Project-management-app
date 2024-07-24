const mongoose = require('mongoose');
const Role = require("../models/role");


//Roles
function initialRole() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        return Promise.all([
          new Role({ name: "admin" }).save(),
          new Role({ name: "user" }).save(),
        ]);
      }
    })
    .then(() => {
    })
    .catch((err) => {
    });
}

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        initialRole();
    }
).catch(
    (err)=>{
    console.log(err);
})


module.exports=mongoose;
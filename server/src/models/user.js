import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    required: false,
    default: false,
  }
});

userSchema.statics.signup = async function (userName, password) {
  if (!userName || !password) throw Error("All fields must be filled");
  if(!validator.isStrongPassword(password)) throw Error("password is not strong enough");

  const exists = await this.findOne({ userName });
  if (exists) throw Error("userName already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ userName, password: hash });

  return user;
};

userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) throw Error("All fields must be filled");

  const user = await this.findOne({userName});
  if(!user) throw Error("Incorrect userName");
  
  const match = await bcrypt.compare(password, user.password);
  if(!match) throw Error("Incorrect password");
  
  return user;

};

const User = mongoose.model("User", userSchema);

export default User;

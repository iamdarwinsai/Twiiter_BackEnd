import mongoose from "mongoose";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save',function(next){
  let user=this;

  const salt=bcrypt.genSaltSync(10);
  const hashPwd=bcrypt.hashSync(user.password,salt);
  user.password=hashPwd;
  next();
})

userSchema.methods.comparePassword=function compare(password){
  return bcrypt.compareSync(password,this.password);
}

userSchema.methods.genJWT=function generate(){
  return JWT.sign({
    id:this._id,
    email:this.email
  },'twitter_secret',{
    expiresIn:'1h'
  })
}

const User = mongoose.model("User", userSchema);

export default User
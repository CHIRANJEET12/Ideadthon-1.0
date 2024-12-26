import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  location: {
   type: String
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: {
    type: String
  },
  projects: [projectSchema],
  shortlistedProviders: [{
    provider: { type: mongoose.Schema.Types.ObjectId, refPath: 'providerType' },
    providerType: { type: String, enum: ['architect', 'contractor'] }
  }]
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model('user', userSchema);
export default User;
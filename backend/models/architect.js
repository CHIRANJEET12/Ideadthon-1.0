import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const architectSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  businessName: { type: String, required: true },
  businessLicense: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  portfolio: [{
    title: String,
    description: String,
    images: [String]
  }],
  specializations: [{
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'landscape', 'interior']
  }],
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    rating: { type: Number, min: 1, max: 5 },
    review: String
  }],
  activeProjects: [{
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    status: { type: String, enum: ['ongoing', 'completed'] }
  }]
});

// architectSchema.methods.generateAuthToken = function() {
//   return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
// };

// architectSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// architectSchema.statics.hashPassword = async function(password) {
//   return await bcrypt.hash(password, 10);
// };

const Architect = mongoose.model('architect', architectSchema);
export default Architect;
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const contractorSchema = new mongoose.Schema({
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
    enum: ['general', 'electrical', 'plumbing', 'carpentry', 'masonry']
  }],
  insurance: {
    provider: String,
    policyNumber: String,
    expiryDate: Date
  },
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

contractorSchema.methods.generateAuthToken = function() {
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
};

contractorSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

contractorSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

const Contractor = mongoose.model('contractor', contractorSchema);
export default Contractor;
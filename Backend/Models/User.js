const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'subadmin', 'student'], default: 'student' },
  subadminCourse: { type: Number }, // course id for subadmin, only used if role is subadmin
  courses: [{
    id: Number, // course id from frontend
    title: String,
    progress: { type: Number, default: 0 }, // percent or lectures completed
    completedLectures: { type: [String], default: [] }, // array of completed lecture ids as strings
    // add more fields as needed
  }],
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  // Use timingSafeEqual for extra security
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);

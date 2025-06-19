const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: String, required: true },
  resources: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  comments: [
    {
      author: { type: String, required: true },
      text: { type: String, required: true },
      time: { type: Date, default: Date.now },
    }
  ],
});

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  lectures: [lectureSchema],
});

module.exports = mongoose.model('Course', courseSchema);

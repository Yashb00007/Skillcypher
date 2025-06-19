const express = require('express');
const router = express.Router();
const { auth } = require('../Middlewares/auth');
const User = require('../Models/User');

// Only allow admins to manage subadmins
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Only admin can perform this action' });
  }
  next();
}

// Only allow subadmins to manage their own course
function requireSubadmin(req, res, next) {
  if (req.user.role !== 'subadmin') {
    return res.status(403).json({ msg: 'Only subadmin can perform this action' });
  }
  next();
}

// Add subadmin (now with email required)
router.post('/add-subadmin', auth, requireAdmin, async (req, res) => {
  const { name, email, password, courseId } = req.body;
  if (!name || !email || !password || !courseId) return res.status(400).json({ msg: 'All fields required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'Email already exists' });
  const subadmin = await User.create({ name, email, password, role: 'subadmin', subadminCourse: courseId });
  res.status(201).json({ msg: 'Subadmin created', subadmin: { id: subadmin._id, name: subadmin.name, email: subadmin.email, course: subadmin.subadminCourse } });
});

// Remove subadmin
router.delete('/remove-subadmin/:id', auth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user || user.role !== 'subadmin') return res.status(404).json({ msg: 'Subadmin not found' });
  await user.deleteOne();
  res.json({ msg: 'Subadmin removed' });
});

// List all subadmins (return email)
router.get('/subadmins', auth, requireAdmin, async (req, res) => {
  const subadmins = await User.find({ role: 'subadmin' });
  res.json(subadmins.map(u => ({ id: u._id, name: u.name, email: u.email, course: u.subadminCourse })));
});

// Add lecture to subadmin's course
router.post('/add-lecture', auth, requireSubadmin, async (req, res) => {
  const { title, videoUrl, duration, resources } = req.body;
  if (!title || !videoUrl || !duration) return res.status(400).json({ msg: 'Title, videoUrl, and duration are required' });

  const user = await User.findById(req.user._id);
  if (!user || user.role !== 'subadmin') return res.status(403).json({ msg: 'Unauthorized' });

  const courseId = user.subadminCourse;
  if (!courseId) return res.status(400).json({ msg: 'Subadmin has no assigned course' });

  // Find course in user's courses array or create if not exists
  let course = user.courses.find(c => c.id === courseId);
  if (!course) {
    course = { id: courseId, title: '', lectures: [] };
    user.courses.push(course);
  }
  if (!course.lectures) course.lectures = [];

  // Add new lecture with unique id
  const newLectureId = course.lectures.length > 0 ? Math.max(...course.lectures.map(l => l.id)) + 1 : 1;
  const newLecture = { id: newLectureId, title, videoUrl, duration, resources };
  course.lectures.push(newLecture);

  await user.save();
  res.status(201).json({ msg: 'Lecture added', lecture: newLecture });
});

// Delete lecture from subadmin's course
router.delete('/delete-lecture/:lectureId', auth, requireSubadmin, async (req, res) => {
  const { lectureId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user || user.role !== 'subadmin') return res.status(403).json({ msg: 'Unauthorized' });

  const courseId = user.subadminCourse;
  if (!courseId) return res.status(400).json({ msg: 'Subadmin has no assigned course' });

  const course = user.courses.find(c => c.id === courseId);
  if (!course || !course.lectures) return res.status(404).json({ msg: 'Course or lectures not found' });

  const lectureIndex = course.lectures.findIndex(l => l.id === parseInt(lectureId));
  if (lectureIndex === -1) return res.status(404).json({ msg: 'Lecture not found' });

  course.lectures.splice(lectureIndex, 1);
  await user.save();
  res.json({ msg: 'Lecture deleted' });
});

// Schedule upcoming class for subadmin's course
router.post('/schedule-class', auth, requireSubadmin, async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) return res.status(400).json({ msg: 'Title and date are required' });

  const user = await User.findById(req.user._id);
  if (!user || user.role !== 'subadmin') return res.status(403).json({ msg: 'Unauthorized' });

  const courseId = user.subadminCourse;
  if (!courseId) return res.status(400).json({ msg: 'Subadmin has no assigned course' });

  // For demo, store upcoming classes in-memory or extend to DB as needed
  if (!global.upcomingClasses) global.upcomingClasses = [];
  global.upcomingClasses.push({ title, date, courseId });

  res.status(201).json({ msg: 'Class scheduled' });
});

module.exports = router;

module.exports = router;

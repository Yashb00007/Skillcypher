const express = require('express');
const router = express.Router();
const { auth } = require('../Middlewares/auth');
const User = require('../Models/User');

// Get current user profile and courses
router.get('/me', auth, async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    subadminCourse: user.subadminCourse, // include subadminCourse for subadmins
    courses: user.courses || []
  });
});

// Add a course to user's courses
router.post('/add-course', auth, async (req, res) => {
  const { id, title } = req.body;
  if (!id || !title) return res.status(400).json({ msg: 'Course id and title required' });
  // Prevent duplicate
  if (req.user.courses.some(c => c.id === id)) {
    return res.status(400).json({ msg: 'Course already added' });
  }
  req.user.courses.push({ id, title });
  await req.user.save();
  res.json({ msg: 'Course added', courses: req.user.courses });
});

// Mark a lecture as complete and update course progress
router.post('/mark-lecture-complete', auth, async (req, res) => {
  try {
    let { courseId, lectureId } = req.body;
    if (!courseId || !lectureId) return res.status(400).json({ msg: 'Course and lecture id required' });
    const user = req.user;
    const course = user.courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    // Track completed lectures as an array if not present
    if (!course.completedLectures) course.completedLectures = [];
    lectureId = lectureId.toString();
    const completedLecturesStr = course.completedLectures.map(id => id.toString());
    if (!completedLecturesStr.includes(lectureId)) {
      course.completedLectures.push(lectureId);
    }
    // Calculate progress as percent
    // (Assume you have a way to get total lectures for the course, e.g. from a Course model or static value)
    // For now, let frontend send totalLectures for simplicity
    const { totalLectures } = req.body;
    if (totalLectures) {
      course.progress = Math.round((course.completedLectures.length / totalLectures) * 100);
    }
    await user.save();
    res.json({ msg: 'Lecture marked complete', courses: user.courses });
  } catch (error) {
    console.error('Error in mark-lecture-complete:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

router.post('/unmark-lecture-complete', auth, async (req, res) => {
  try {
    let { courseId, lectureId } = req.body;
    if (!courseId || !lectureId) return res.status(400).json({ msg: 'Course and lecture id required' });
    const user = req.user;
    const course = user.courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    if (!course.completedLectures) course.completedLectures = [];
    lectureId = lectureId.toString();
    const completedLecturesStr = course.completedLectures.map(id => id.toString());
    if (completedLecturesStr.includes(lectureId)) {
      course.completedLectures = course.completedLectures.filter(id => id.toString() !== lectureId);
    }
    // Update progress
    const { totalLectures } = req.body;
    if (totalLectures) {
      course.progress = Math.round((course.completedLectures.length / totalLectures) * 100);
    }
    await user.save();
    res.json({ msg: 'Lecture unmarked complete', courses: user.courses });
  } catch (error) {
    console.error('Error in unmark-lecture-complete:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

module.exports = router;

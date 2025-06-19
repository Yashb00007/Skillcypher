const express = require('express');
const router = express.Router();
const { auth } = require('../Middlewares/auth');
const Course = require('../Models/Course');

// Get all courses (public)
router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a new course (admin only)
router.post('/add-course', auth, async (req, res) => {
  // Optionally, add admin check here
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ msg: 'Title is required' });

  // Generate a unique id for the course
  const lastCourse = await Course.findOne().sort({ id: -1 });
  const newId = lastCourse ? lastCourse.id + 1 : 1;

  const newCourse = new Course({
    id: newId,
    title,
    description,
    lectures: [],
  });

  try {
    await newCourse.save();
    res.status(201).json({ msg: 'Course added', course: newCourse });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to add course', error: err.message });
  }
});

// Add a lecture to a course (admin only)
router.post('/add-lecture', auth, async (req, res) => {
  // Optionally, add admin check here
  const { courseId, title, videoUrl, duration, resources } = req.body;
  if (!courseId || !title || !videoUrl || !duration) return res.status(400).json({ msg: 'All fields required' });
  const course = await Course.findOne({ id: courseId });
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  const newLecture = { title, videoUrl, duration, resources };
  course.lectures.push(newLecture);
  await course.save();
  res.status(201).json({ msg: 'Lecture added', lectures: course.lectures });
});

// Delete a lecture from a course (admin only)
router.delete('/delete-lecture/:courseId/:lectureIndex', auth, async (req, res) => {
  // Optionally, add admin check here
  const { courseId, lectureIndex } = req.params;
  const course = await Course.findOne({ id: Number(courseId) });
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  if (course.lectures.length <= lectureIndex) return res.status(404).json({ msg: 'Lecture not found' });
  course.lectures.splice(lectureIndex, 1);
  await course.save();
  res.json({ msg: 'Lecture deleted', lectures: course.lectures });
});

router.delete('/delete-course/:courseId', auth, async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ id: Number(courseId) });
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    await course.deleteOne();
    res.json({ msg: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete course', error: err.message });
  }
});

// Mark a lecture as completed (authenticated users)
// This route is deprecated and removed to prevent shared completion status among users
// router.post('/lecture/:courseId/:lectureId/complete', auth, async (req, res) => {
//   const { courseId, lectureId } = req.params;
//   try {
//     const course = await Course.findOne({ id: Number(courseId) });
//     if (!course) return res.status(404).json({ msg: 'Course not found' });
//     const lecture = course.lectures.id(lectureId);
//     if (!lecture) return res.status(404).json({ msg: 'Lecture not found' });
//     lecture.completed = true;
//     await course.save();
//     res.json({ msg: 'Lecture marked as completed', lecture });
//   } catch (err) {
//     res.status(500).json({ msg: 'Failed to mark lecture complete', error: err.message });
//   }
// });

// Get comments for a lecture
router.get('/lecture/:courseId/:lectureId/comments', auth, async (req, res) => {
  const { courseId, lectureId } = req.params;
  try {
    const course = await Course.findOne({ id: Number(courseId) });
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    const lecture = course.lectures.id(lectureId);
    if (!lecture) return res.status(404).json({ msg: 'Lecture not found' });
    res.json(lecture.comments || []);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get comments', error: err.message });
  }
});

// Add a comment to a lecture
router.post('/lecture/:courseId/:lectureId/comments', auth, async (req, res) => {
  const { courseId, lectureId } = req.params;
  const { author, text } = req.body;
  if (!text) return res.status(400).json({ msg: 'Comment text is required' });
  try {
    const course = await Course.findOne({ id: Number(courseId) });
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    const lecture = course.lectures.id(lectureId);
    if (!lecture) return res.status(404).json({ msg: 'Lecture not found' });
    if (!lecture.comments) lecture.comments = [];
    lecture.comments.push({ author, text, time: new Date() });
    await course.save();
    res.status(201).json({ msg: 'Comment added', comments: lecture.comments });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to add comment', error: err.message });
  }
});

module.exports = router;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../lib/UserContext.jsx';

export default function SubadminPanel() {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [form, setForm] = useState({ title: '', videoUrl: '', duration: '', resources: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(null);

  useEffect(() => {
    if (user && user.subadminCourse) {
      fetchCourseLectures(user.subadminCourse);
    } else {
      setLoading(false);
      setError('User or assigned course not found.');
    }
  }, [user]);

  const fetchCourseLectures = async (courseId) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/course/courses');
      const foundCourse = res.data.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setLectures(foundCourse.lectures || []);
        setError('');
      } else {
        setError('Assigned course not found.');
      }
    } catch (err) {
      setError('Failed to fetch course lectures.');
    }
    setLoading(false);
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!course) return;
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/course/add-lecture', { courseId: course.id, ...form }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: '', videoUrl: '', duration: '', resources: '' });
      // Update lectures state locally to avoid reload
      if (res.data && res.data.lectures) {
        setLectures(res.data.lectures);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add lecture.');
    }
  };

  const handleDeleteLecture = async (lectureIndex) => {
    if (!course) return;
    if (!window.confirm('Are you sure you want to delete this lecture?')) return;
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/course/delete-lecture/${course.id}/${lectureIndex}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update lectures state locally to avoid reload
      if (res.data && res.data.lectures) {
        setLectures(res.data.lectures);
      }
    } catch (err) {
      setError('Failed to delete lecture.');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!course) return <div className="p-6">No assigned course found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#e6fcf3] to-[#ACE1AF] p-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8">
        <h2 className="text-3xl font-bold text-[#54F4B9] mb-6">Subadmin Panel - {course.title}</h2>

        <form onSubmit={handleAddLecture} className="mb-6 flex flex-col gap-2">
          <input
            className="border rounded p-2"
            placeholder="Lecture Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="Duration"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="Resources (optional)"
            value={form.resources}
            onChange={e => setForm({ ...form, resources: e.target.value })}
          />
          <button type="submit" className="bg-[#54F4B9] text-white font-bold py-2 rounded">Add Lecture</button>
        </form>

        <h3 className="text-xl font-semibold mb-2">Lectures</h3>
        <ul className="divide-y">
          {lectures.map((lec, idx) => (
            <li key={idx} className="flex justify-between items-center py-2">
              <span>{lec.title} ({lec.duration})</span>
              <button onClick={() => handleDeleteLecture(idx)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

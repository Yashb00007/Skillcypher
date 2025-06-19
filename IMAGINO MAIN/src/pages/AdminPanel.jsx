import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({ title: '', videoUrl: '', duration: '', resources: '' });
  const [loading, setLoading] = useState(true);
  const [addCourseForm, setAddCourseForm] = useState({ title: '', description: '' });
  const [addCourseLoading, setAddCourseLoading] = useState(false);
  const [addCourseError, setAddCourseError] = useState('');

  // Subadmin states
  const [subadmins, setSubadmins] = useState([]);
  const [subadminForm, setSubadminForm] = useState({ name: '', email: '', password: '', courseId: '' });
  const [subadminLoading, setSubadminLoading] = useState(false);
  const [subadminError, setSubadminError] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchSubadmins();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/course/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
    setLoading(false);
  };

  const fetchSubadmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/subadmin/subadmins', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubadmins(res.data);
    } catch (err) {
      console.error('Failed to fetch subadmins:', err);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setAddCourseLoading(true);
    setAddCourseError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/course/add-course', addCourseForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddCourseForm({ title: '', description: '' });
      fetchCourses();
    } catch (err) {
      setAddCourseError('Failed to add course.');
    }
    setAddCourseLoading(false);
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    const token = localStorage.getItem('token');
    await axios.post('/api/course/add-lecture', { courseId: selectedCourse.id, ...form }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setForm({ title: '', videoUrl: '', duration: '', resources: '' });
    fetchCourses();
  };

  const handleDeleteLecture = async (courseId, lectureIndex) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/course/delete-lecture/${courseId}/${lectureIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCourses();
  };

  // Subadmin handlers
  const handleAddSubadmin = async (e) => {
    e.preventDefault();
    setSubadminLoading(true);
    setSubadminError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/subadmin/add-subadmin', subadminForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubadminForm({ name: '', email: '', password: '', courseId: '' });
      fetchSubadmins();
    } catch (err) {
      setSubadminError(err.response?.data?.msg || 'Failed to add subadmin.');
    }
    setSubadminLoading(false);
  };

  const handleDeleteSubadmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subadmin?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/subadmin/remove-subadmin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubadmins();
    } catch (err) {
      alert('Failed to delete subadmin.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#e6fcf3] to-[#ACE1AF] p-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8">
        <h2 className="text-3xl font-bold text-[#54F4B9] mb-6">Admin Panel</h2>

        {/* Add Course Form */}
        <form onSubmit={handleAddCourse} className="mb-8 flex flex-col gap-2">
          <h3 className="text-xl font-semibold mb-2">Add New Course</h3>
          <input className="border rounded p-2" placeholder="Course Title" value={addCourseForm.title} onChange={e => setAddCourseForm({ ...addCourseForm, title: e.target.value })} required />
          <input className="border rounded p-2" placeholder="Course Description" value={addCourseForm.description} onChange={e => setAddCourseForm({ ...addCourseForm, description: e.target.value })} required />
          <button type="submit" className="bg-[#54F4B9] text-white font-bold py-2 rounded" disabled={addCourseLoading}>{addCourseLoading ? 'Adding...' : 'Add Course'}</button>
          {addCourseError && <div className="text-red-500">{addCourseError}</div>}
        </form>

        {/* Course List and Lecture Management */}
        {loading ? <div>Loading...</div> : (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Select Course</label>
              <ul className="border rounded p-2 max-h-40 overflow-y-auto">
                {courses.map(c => (
                  <li key={c.id} className="flex justify-between items-center py-1">
                    <button
                      className={`text-left flex-grow ${selectedCourse?.id === c.id ? 'font-bold text-[#54F4B9]' : ''}`}
                      onClick={() => setSelectedCourse(c)}
                    >
                      {c.title}
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={async () => {
                        if (window.confirm(`Are you sure you want to delete course "${c.title}"?`)) {
                          try {
                            const token = localStorage.getItem('token');
                            await axios.delete(`/api/course/delete-course/${c.id}`, {
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            if (selectedCourse?.id === c.id) setSelectedCourse(null);
                            fetchCourses();
                          } catch {
                            alert('Failed to delete course.');
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {selectedCourse && (
              <>
                <form onSubmit={handleAddLecture} className="mb-6 flex flex-col gap-2">
                  <input className="border rounded p-2" placeholder="Lecture Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                  <input className="border rounded p-2" placeholder="Video URL" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} required />
                  <input className="border rounded p-2" placeholder="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} required />
                  <input className="border rounded p-2" placeholder="Resources (optional)" value={form.resources} onChange={e => setForm({ ...form, resources: e.target.value })} />
                  <button type="submit" className="bg-[#54F4B9] text-white font-bold py-2 rounded">Add Lecture</button>
                </form>
                <h3 className="text-xl font-semibold mb-2">Lectures</h3>
                <ul className="divide-y">
                  {selectedCourse.lectures.map((lec, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2">
                      <span>{lec.title} ({lec.duration})</span>
                      <button onClick={() => handleDeleteLecture(selectedCourse.id, idx)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {/* Subadmin Management */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Manage Subadmins</h3>
          <form onSubmit={handleAddSubadmin} className="mb-4 flex flex-col gap-2 max-w-md">
            <input
              className="border rounded p-2"
              placeholder="Name"
              value={subadminForm.name}
              onChange={e => setSubadminForm({ ...subadminForm, name: e.target.value })}
              required
            />
            <input
              className="border rounded p-2"
              placeholder="Email"
              type="email"
              value={subadminForm.email}
              onChange={e => setSubadminForm({ ...subadminForm, email: e.target.value })}
              required
            />
            <input
              className="border rounded p-2"
              placeholder="Password"
              type="password"
              value={subadminForm.password}
              onChange={e => setSubadminForm({ ...subadminForm, password: e.target.value })}
              required
            />
            <select
              className="border rounded p-2"
              value={subadminForm.courseId}
              onChange={e => setSubadminForm({ ...subadminForm, courseId: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <button type="submit" className="bg-[#54F4B9] text-white font-bold py-2 rounded" disabled={subadminLoading}>
              {subadminLoading ? 'Adding...' : 'Add Subadmin'}
            </button>
            {subadminError && <div className="text-red-500">{subadminError}</div>}
          </form>

          <ul className="max-w-md border rounded p-4">
            {subadmins.map(sa => (
              <li key={sa.id} className="flex justify-between items-center py-1">
                <span>{sa.name} ({sa.email}) - Course ID: {sa.course}</span>
                <button
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteSubadmin(sa.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

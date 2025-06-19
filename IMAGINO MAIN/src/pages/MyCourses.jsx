import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Skillcypher from '../images/Skillcypher.png';

const courseMeta = {
  1: {
    description: 'Master Python from basics to advanced with hands-on projects.',
    image: Skillcypher,
    color: 'text-[#ACE1AF]',
    btnColor: 'bg-[#ACE1AF]',
    btnHoverColor: 'bg-indigo-600',
  },
  2: {
    description: 'Learn C++ fundamentals and advanced concepts step by step.',
    image: Skillcypher,
    color: 'text-purple-500',
    btnColor: 'bg-purple-500',
    btnHoverColor: 'bg-purple-600',
  },
  3: {
    description: 'Intensive Java training for beginners and aspiring developers.',
    image: Skillcypher,
    color: 'text-cyan-500',
    btnColor: 'bg-cyan-500',
    btnHoverColor: 'bg-cyan-600',
  },
};

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data.courses || []);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[#e6fcf3] to-[#54F4B9] text-gray-800 p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">My Courses</h1>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-600">You have not enrolled in any courses yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const meta = courseMeta[course.id] || {};
                return (
                  <div
                    key={course.id}
                    className="bg-black/90 shadow-xl rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform w-full max-w-xs mx-auto border border-[#ACE1AF]"
                    style={{ minHeight: 260 }}
                  >
                    <img src={meta.image} alt={course.title} className="w-full h-36 object-cover rounded-t-xl" />
                    <div className="p-4 md:p-5">
                      <h3 className={`text-xl font-semibold whitespace-pre-line ${meta.color} mb-1`}>{course.title}</h3>
                      <p className="text-white/80 mb-3 text-sm two-lines min-h-[48px]">{meta.description}</p>
                      <button
                        className={`inline-block ${meta.btnColor} hover:${meta.btnHoverColor} text-black px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}
                        disabled
                      >
                        Added
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;

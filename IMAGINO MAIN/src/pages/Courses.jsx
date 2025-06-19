import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skillcypher from '../images/Skillcypher.png';
import Nav from '../components/Nav';

const courseMeta = {
  1: {
    title: 'Complete Python Course',
    image: Skillcypher,
    titleColor: 'text-[#ACE1AF]',
    btnColor: 'bg-[#ACE1AF]',
    btnHoverColor: 'bg-indigo-600',
  },
  2: {
    title: 'C++ Zero to Hero',
    image: Skillcypher,
    titleColor: 'text-purple-500',
    btnColor: 'bg-purple-500',
    btnHoverColor: 'bg-purple-600',
  },
  3: {
    title: 'Java Bootcamp',
    image: Skillcypher,
    titleColor: 'text-cyan-500',
    btnColor: 'bg-cyan-500',
    btnHoverColor: 'bg-cyan-600',
  },
};

const defaultCourseMeta = {
  image: Skillcypher,
  titleColor: 'text-cyan-500',
  btnColor: 'bg-cyan-500',
  btnHoverColor: 'bg-cyan-600',
};

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await axios.get('/api/course/courses');
      setCourses(res.data);
      console.log('Courses page fetched courses:', res.data); // DEBUG LOG
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-[#e6fcf3] to-[#54F4B9] text-gray-800 m-10 rounded-2xl">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
            All Courses
          </h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const meta = courseMeta[course.id] || defaultCourseMeta;
                return (
                  <div key={course.id} onClick={() => navigate(`/lectureview?course=${course.id}`)} className="cursor-pointer">
                    <div className="bg-black/90 shadow-xl rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform w-full max-w-xs mx-auto border border-[#ACE1AF]" style={{minHeight: '260px'}}>
                      <img
                        src={meta.image}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                      <div className="p-4 md:p-5">
                        <h3 className={`text-xl font-semibold whitespace-pre-line ${meta.titleColor} mb-1`}>{meta.title || course.title}</h3>
                        <p className="text-white mb-3 text-sm two-lines min-h-[30px]">{course.description}</p>
                        <button
                          className={`inline-block ${meta.btnColor} hover:${meta.btnHoverColor} text-black px-5 py-2 rounded-full text-sm font-semibold shadow-sm`}
                          disabled
                        >
                          Learn More
                        </button>
                      </div>
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

export default Courses;

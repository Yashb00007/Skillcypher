import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext.jsx';

const LecturesContext = createContext();

export const LecturesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const { fetchUser } = useUser();

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: 'Bearer ' + token } : {};
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/course/courses', { headers: getAuthHeaders() });
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [getAuthHeaders]);

  const markLectureComplete = async (courseId, lectureId) => {
    try {
      // Optimistically update local state
      setCourses(prevCourses => {
        return prevCourses.map(course => {
          if (course.id === courseId) {
            const updatedLectures = course.lectures.map(lecture => {
              if (lecture._id === lectureId) {
                return { ...lecture, completed: true };
              }
              return lecture;
            });
            return { ...course, lectures: updatedLectures };
          }
          return course;
        });
      });

      // Update user progress in backend asynchronously
      const course = courses.find(c => c.id === courseId);
      const totalLectures = course ? course.lectures.length : 0;
      await axios.post('/api/user/mark-lecture-complete', { courseId, lectureId, totalLectures }, { headers: getAuthHeaders() });

      // Refresh user data to update dashboard progress
      await fetchUser();
    } catch (error) {
      console.error('Failed to mark lecture complete:', error);
      // Optionally revert local state update on failure
    }
  };

  const unmarkLectureComplete = async (courseId, lectureId) => {
    try {
      // Optimistically update local state
      setCourses(prevCourses => {
        return prevCourses.map(course => {
          if (course.id === courseId) {
            const updatedLectures = course.lectures.map(lecture => {
              if (lecture._id === lectureId) {
                return { ...lecture, completed: false };
              }
              return lecture;
            });
            return { ...course, lectures: updatedLectures };
          }
          return course;
        });
      });

      // Update user progress in backend asynchronously
      const course = courses.find(c => c.id === courseId);
      const totalLectures = course ? course.lectures.length : 0;
      await axios.post('/api/user/unmark-lecture-complete', { courseId, lectureId, totalLectures }, { headers: getAuthHeaders() });

      // Refresh user data to update dashboard progress
      await fetchUser();
    } catch (error) {
      console.error('Failed to unmark lecture complete:', error);
      // Optionally revert local state update on failure
    }
  };

  const fetchComments = useCallback(async (courseId, lectureId) => {
    try {
      const res = await axios.get('/api/course/lecture/' + courseId + '/' + lectureId + '/comments', { headers: getAuthHeaders() });
      return res.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      return [];
    }
  }, [getAuthHeaders]);

  const postComment = useCallback(async (courseId, lectureId, author, text) => {
    try {
      const res = await axios.post('/api/course/lecture/' + courseId + '/' + lectureId + '/comments', { author, text }, { headers: getAuthHeaders() });
      return res.data.comments;
    } catch (error) {
      console.error('Failed to post comment:', error);
      return null;
    }
  }, [getAuthHeaders]);

  return (
    <LecturesContext.Provider value={{ courses, markLectureComplete, unmarkLectureComplete, fetchComments, postComment, fetchUser }}>
      {children}
    </LecturesContext.Provider>
  );
};

export const useLectures = () => useContext(LecturesContext);

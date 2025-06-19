import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Play, Download, MessageCircle, Clock, CheckCircle } from "lucide-react";
import Nav from "./Nav";
import { useLectures } from '../lib/LecturesContext';
import { useUser } from '../lib/UserContext.jsx';
import PurchaseCourse from './PurchaseCourse';

export default function LectureView() {
  const { courses, markLectureComplete, fetchComments, postComment, fetchUser } = useLectures();
  const { user } = useUser();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const courseId = parseInt(params.get("course"), 10) || 1;
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const [currentLecture, setCurrentLecture] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPurchaseUI, setShowPurchaseUI] = useState(false);

  useEffect(() => {
    if (course && user) {
      // Check if user has purchased the course
      const userCourse = user.courses.find(c => c.id === course.id);
      if (!userCourse) {
        setShowPurchaseUI(true);
      } else {
        setShowPurchaseUI(false);
        // Update lectures with completion status based on user.courses.completedLectures
        course.lectures.forEach(lecture => {
          lecture.completed = userCourse.completedLectures?.includes(lecture._id) || false;
        });
      }
      // Set current lecture only if it exists
      if (course.lectures && course.lectures.length > 0) {
        setCurrentLecture(course.lectures[0]);
      } else {
        setCurrentLecture(null);
      }
    }
  }, [course, user]);

  useEffect(() => {
    // If currentLecture is null, try to set it after courses load
    if (!currentLecture && course && course.lectures && course.lectures.length > 0) {
      setCurrentLecture(course.lectures[0]);
    }
  }, [currentLecture, course]);

  useEffect(() => {
    if (currentLecture && !showPurchaseUI) {
      // Fetch comments from backend
      fetchComments(course.id, currentLecture._id)
        .then(setComments)
        .catch((error) => {
          console.error('Error fetching comments:', error);
          setComments([]);
        });

      // Mock AI suggestions based on current lecture title
      setAiSuggestions([
        `Try practicing more on ${currentLecture.title} exercises.`,
        `Watch supplementary videos on ${currentLecture.title} concepts.`,
        `Join the discussion forum for ${currentLecture.title} to ask questions.`,
      ]);
    }
  }, [currentLecture, course, fetchComments, showPurchaseUI]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const updatedComments = await postComment(course.id, currentLecture._id, "You", newComment);
        if (updatedComments) {
          setComments(updatedComments);
          setNewComment("");
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  const handleLectureChange = (lecture) => {
    setCurrentLecture(lecture);
    setIsPlaying(false);
  };

  async function handleMarkComplete(lectureId) {
    try {
      await markLectureComplete(course.id, lectureId);
      // Update local lecture completion based on user data after fetchUser
      const userCourse = user.courses.find(c => c.id === course.id);
      if (userCourse) {
        setCurrentLecture(prev => ({
          ...prev,
          completed: userCourse.completedLectures?.includes(lectureId) || false,
        }));
      }
      await fetchUser();
    } catch (error) {
      console.error('Error marking lecture complete:', error);
    }
  }

  const lectures = course?.lectures || [];
  const completedCount = lectures.filter((l) => l.completed).length;
  const progressPercentage = lectures.length > 0 ? (completedCount / lectures.length) * 100 : 0;

  if (!course) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="text-2xl text-gray-700">Loading course data...</div>
        </div>
      </>
    );
  }

  if (showPurchaseUI) {
    return (
      <>
        <Nav />
        <PurchaseCourse course={course} onClose={() => setShowPurchaseUI(false)} />
      </>
    );
  }

  if (!currentLecture) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="text-2xl text-gray-700">Loading lecture data...</div>
        </div>
      </>
    );
  }

  if (!lectures || lectures.length === 0) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="text-2xl text-gray-700">No lectures found for this course.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Progress: {completedCount}/{lectures.length} lectures
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Video Player */}
              <div className="overflow-hidden shadow-xl">
                <div className="relative aspect-video bg-black rounded-t-lg">
                  {currentLecture && (currentLecture.videoUrl.includes("youtube.com") ||
                  currentLecture.videoUrl.includes("youtu.be")) ? (
                    <iframe
                      className="w-full h-full rounded-t-lg"
                      src={currentLecture.videoUrl.replace("watch?v=", "embed/")}
                      title={currentLecture.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : currentLecture ? (
                    <video
                      className="w-full h-full rounded-t-lg"
                      controls
                      src={currentLecture.videoUrl}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  ) : null}
                  {!isPlaying &&
                    !(
                      currentLecture.videoUrl.includes("youtube.com") ||
                      currentLecture.videoUrl.includes("youtu.be")
                    ) && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-t-lg cursor-pointer"
                        onClick={() => {
                          const video = document.querySelector("video");
                          if (video) video.play();
                        }}
                      >
                        <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentLecture.title}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentLecture.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg px-4 py-2 rounded-md flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Resources
                      </button>
                      {!currentLecture.completed && (
                        <button
                          onClick={() => handleMarkComplete(currentLecture._id)}
                          className="bg-green-600 hover:bg-green-700 text-white shadow-lg px-4 py-2 rounded-md flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              {/* Comments Section */}
              <div className="shadow-lg">
                <div className="bg-white rounded-t-lg px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-gray-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Discussion ({comments.length})
                    </h2>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-b-lg p-6 space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {comments.length ? (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white rounded-lg p-4 border-l-4 border-indigo-200 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.time}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No comments yet. Start the discussion!</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <input
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      type="text"
                      placeholder="Ask a question or share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
                    />
                    <button
                      onClick={handleCommentSubmit}
                      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg sticky top-6">
                <div className="bg-gray-100 rounded-t-lg px-4 py-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Course Content
                  </h2>
                </div>
                <div className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {lectures.map((lecture, index) => (
                      <div
                        key={lecture._id}
                        onClick={() => handleLectureChange(lecture)}
                        className={`cursor-pointer p-4 border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                          lecture._id === currentLecture._id
                            ? "bg-indigo-100 border-l-4 border-l-indigo-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              lecture.completed
                                ? "bg-green-100 text-green-700"
                                : lecture._id === currentLecture._id
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {lecture.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-sm font-medium truncate ${
                                lecture._id === currentLecture._id
                                  ? "text-indigo-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {lecture.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{lecture.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

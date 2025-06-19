import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../lib/UserContext.jsx';
import PurchaseCourse from '../components/PurchaseCourse.jsx';

const Dashboard = () => {
  const { user, loading, error } = useUser();
  const [showNav, setShowNav] = useState(false); // State for mobile nav toggle
  const [purchaseCourse, setPurchaseCourse] = useState(null);

  React.useEffect(() => {
    console.log('Dashboard user.courses updated:', user?.courses);
  }, [user]);

  // Close nav on route change (for better UX)
  React.useEffect(() => {
    setShowNav(false);
  }, [window.location.pathname]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center text-2xl">Loading...</div>;
  if (error) return <div className="w-full h-screen flex items-center justify-center text-red-500 text-2xl">{error}</div>;

  const handlePurchaseClick = (course) => {
    setPurchaseCourse(course);
  };

  const handlePurchaseClose = () => {
    setPurchaseCourse(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full shadow-md bg-gradient-to-r from-[#54F4B9] to-[#ACE1AF] py-4 md:py-6 px-4 md:px-8 flex flex-col md:flex-row items-center md:justify-between relative">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2 md:mb-0 text-center md:text-left w-full">Welcome, {user?.name || 'User'}!</h1>
          <button className="md:hidden ml-2 p-2 flex-shrink-0" onClick={() => setShowNav(v => !v)} aria-label="Open Menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <div className={`w-full md:w-auto flex-col md:flex-row flex gap-4 items-center md:justify-end transition-all duration-200 ${showNav ? 'flex' : 'hidden'} md:flex bg-gradient-to-r from-[#54F4B9] to-[#ACE1AF] md:bg-none p-4 md:p-0 rounded-b-xl md:rounded-none z-40 md:z-auto absolute md:static top-full left-0 md:top-auto md:left-auto shadow-lg md:shadow-none`} style={{minWidth: 0}}>
          <Link to="/" className="text-black font-semibold hover:underline w-full md:w-auto text-center">Home</Link>
          <Link to="/courses" className="text-black font-semibold hover:underline w-full md:w-auto text-center">Our Courses</Link>
          <Link to="/my-courses" className="text-black font-semibold hover:underline w-full md:w-auto text-center">My Courses</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-[#f7fafc] rounded-2xl shadow-md p-6 flex flex-col gap-6 mb-8 lg:mb-0 flex-shrink-0">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-[#54F4B9] flex items-center justify-center text-3xl text-white font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <div className="text-lg font-semibold text-gray-800">{user?.name}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
          <nav className="flex flex-col gap-3 mt-6">
            <Link to="/dashboard" className="py-2 px-4 rounded-lg font-medium text-[#54F4B9] bg-white shadow hover:bg-[#e6fcf3] transition">Dashboard Home</Link>
            <Link to="/my-courses" className="py-2 px-4 rounded-lg font-medium text-[#54F4B9] bg-white shadow hover:bg-[#e6fcf3] transition">My Courses</Link>
            <Link to="/settings" className="py-2 px-4 rounded-lg font-medium text-[#54F4B9] bg-white shadow hover:bg-[#e6fcf3] transition">Settings</Link>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col gap-8">
            {/* Top Widgets Row - Full Width Cards */} 
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Widget 1: Progress - Now gets full half width */}
              <div className="bg-gradient-to-br from-[#e6fcf3] via-[#54F4B9]/30 to-[#ACE1AF]/40 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Progress</h2>
                {/* Calculate and display real progress */}
                {user?.courses && user.courses.length > 0 ? (
                  (() => {
                    const totalCourses = user.courses.length;
                    const completedCourses = user.courses.filter(c => (c.progress || 0) >= 100).length;
                    const avgProgress = Math.round(user.courses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalCourses);
                    return (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                          <div className="bg-[#54F4B9] h-6 rounded-full transition-all duration-300" style={{ width: `${avgProgress}%` }}></div>
                        </div>
                        <div className="text-gray-700 font-semibold text-lg">{completedCourses} of {totalCourses} courses completed</div>
                        <div className="text-sm text-gray-600 mt-2">Average Progress: {avgProgress}%</div>
                      </>
                    );
                  })()
                ) : (
                  <div className="text-gray-600">No enrolled courses yet.</div>
                )}
              </div>

            {/* Widget 2: Upcoming - Now gets full half width */}
            {/* Upcoming classes widget removed because 'upcoming' variable is undefined */}
            {/* <div className="bg-gradient-to-br from-[#e6fcf3] via-[#ACE1AF]/30 to-[#54F4B9]/40 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Classes</h2>
              {upcoming.length ? (
                <div className="space-y-3">
                  {upcoming.slice(0, 4).map((cls, i) => (
                    <div key={i} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                      <span className="font-medium text-gray-800">{cls.title}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{cls.date}</span>
                    </div>
                  ))}
                  {upcoming.length > 4 && (
                    <div className="text-center pt-2">
                      <span className="text-sm text-gray-500">+{upcoming.length - 4} more classes</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <div className="text-4xl mb-2"></div>
                  <div>No upcoming classes scheduled.</div>
                </div>
              )}
            </div> */}
          </section>

          {/* Announcements - Full Width */} 
          <section className="bg-gradient-to-br from-[#e6fcf3] via-[#54F4B9]/20 to-[#ACE1AF]/20 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-semibold text-gray-800 mb-1">New Course Launch</div>
                <div className="text-sm text-gray-600">Data Structures launching next week!</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">📢</div>
                <div className="font-semibold text-gray-800 mb-1">Join Our Community</div>
                <div className="text-sm text-gray-600">Discord for peer support and Q&A.</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-gray-800 mb-1">Referral Program</div>
                <div className="text-sm text-gray-600">Refer a friend and get 1 month free!</div>
              </div>
            </div>
          </section>

            {/* My Courses Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
              {user?.courses?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {user.courses.map((course) => {
                    const isPurchased = course.progress !== undefined; // Assuming progress exists only if purchased
                    return (
                      <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 border border-[#ACE1AF] hover:shadow-xl transition-shadow">
                        <div className="text-xl font-semibold text-[#54F4B9] mb-3">{course.title}</div>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-gray-700">Progress</div>
                            <div className="text-sm font-medium text-gray-700">{course.progress || 0}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-[#54F4B9] h-4 rounded-full transition-all duration-300" style={{ width: `${course.progress || 0}%` }}></div>
                          </div>
                        </div>
                        {!isPurchased && (
                          <button
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            onClick={() => handlePurchaseClick(course)}
                          >
                            Purchase
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-600">No courses enrolled yet.</div>
              )}
            </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
          

import React, { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
// Only code-split route-level (page) components
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Courses = lazy(() => import('./pages/Courses'));
const Home = lazy(() => import('./pages/Home'));
const LectureView = lazy(() => import('./components/LectureView'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const SubadminPanel = lazy(() => import('./pages/SubadminPanel'));
// Import main layout/landing components statically
import Hero from './components/Hero'
import Card from './components/Card'
import Batches from './components/Batches'
import Fun from './components/Fun'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import { VelocityScroll } from "./components/magicui/scroll-based-velocity";
import Hackethon from './components/Hackethon'

// Helper to check login
function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Helper to check admin
function RequireAdmin({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const ADMIN_EMAIL = "teamskillcypher@gmail.com"; // Set your admin email
  const userEmail = localStorage.getItem('adminEmail');
  if (!token || userEmail?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Helper to check subadmin
function RequireSubadmin({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  if (!token || userRole !== 'subadmin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-2xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={
          <div>
            <Nav/>
            <Hero/>
            <Batches/>
            <div className='my-5 '>
              <VelocityScroll className="text-4xl md:text-6xl font-bold py-16 px-2 leading-[1.4] md:leading-[1.25] tracking-tight whitespace-nowrap align-middle" style={{overflow: 'visible'}}>
                Join Now 
              </VelocityScroll>
            </div>
            <Fun/>
            <Hackethon/>
            <ContactForm/>
            <Footer/>
          </div>
        } />
        <Route path="/lectureview" element={
          <RequireAuth>
            <LectureView />
          </RequireAuth>
        } />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={
          <RequireAdmin>
            <AdminPanel />
          </RequireAdmin>
        } />
        <Route path="/subadmin" element={
          <RequireSubadmin>
            <SubadminPanel />
          </RequireSubadmin>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </Suspense>
  )
}

export default App
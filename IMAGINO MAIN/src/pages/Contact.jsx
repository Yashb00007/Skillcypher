import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Use a proper mailto link
  const mailTo = 'mailto:teamskillcypher@gmail.com';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `${mailTo}?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-br from-[#e6fcf3] to-[#54F4B9] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#54F4B9] mb-4">Let's talk about everything!</h2>
          <p className="text-gray-700 mb-6">Have a question, suggestion, or just want to say hello? Fill out the form or email us directly.</p>
          <div className="text-gray-700 text-base mb-2">
            <span className="font-semibold">Email:</span> <a href="mailto:teamskillcypher@gmail.com" className="underline text-indigo-600">teamskillcypher@gmail.com</a>
          </div>
          <div className="text-gray-700 text-base">
            <span className="font-semibold">Contact No:</span> 9284195277
          </div>
        </div>
        {/* Right Side - Form */}
        <div className="bg-gray-100 rounded-xl p-6 flex flex-col justify-center shadow-md">
          {submitted ? (
            <div className="text-green-600 text-center text-lg font-semibold">Thank you for reaching out!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full bg-gray-200 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full bg-gray-200 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="email" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="w-full h-32 bg-gray-200 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <button type="submit" className="uppercase text-sm font-bold tracking-wide bg-[#54F4B9] hover:bg-[#43cfa0] text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
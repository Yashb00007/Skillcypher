import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ fullname: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullname,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ fullname: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <div className=" text-gray-900 bg-[#F7F2EB] px-8 py-12 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="text-center w-full">
          <svg className="text-gray-100 h-8 mx-auto" fill="currentColor" viewBox="0 0 150 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Desktop-HD" transform="translate(-1112.000000, -438.000000)" fill="currentColor">
              </g>
            </g>
          </svg>
        </div>
        <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-white text-gray-900 rounded-lg shadow-lg">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Lets talk about everything!</h2>
              <div className="text-gray-700 mt-8">
                <span className="underline"><a target="_BLANK" href="https://veilmail.io/irish-irish-geoff"></a></span>
              </div>
            </div>
            <div className="mt-8 text-center">
            </div>
          </div>
          <div>
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">Full Name</span>
              <input name="fullname" value={form.fullname} onChange={handleChange} className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="" required />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">Email</span>
              <input name="email" value={form.email} onChange={handleChange} className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="email" required />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" required></textarea>
            </div>
            <div className="mt-8">
              <button type="submit" className="uppercase text-sm font-bold tracking-wide bg-cyan-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && (
                <div className="text-green-600 mt-4 font-semibold">Thank you for contacting us!</div>
              )}
              {error && (
                <div className="text-red-600 mt-4 font-semibold">{error}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
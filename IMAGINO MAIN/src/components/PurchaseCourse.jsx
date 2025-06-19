import React from 'react';

export default function PurchaseCourse({ course, onClose }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full flex">
        {/* Left side: Course Info */}
        <div className="w-1/2 p-8 border-r border-gray-200">
          <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
          <p className="text-gray-700 mb-6">{course.description}</p>
          {/* Add more course info as needed */}
          <ul className="list-disc list-inside text-gray-600">
            {course.lectures && course.lectures.length > 0 ? (
              course.lectures.map((lec, idx) => (
                <li key={idx} className="mb-1">
                  {lec.title} ({lec.duration})
                </li>
              ))
            ) : (
              <li>No lectures available</li>
            )}
          </ul>
        </div>

        {/* Right side: Payment UI */}
        <div className="w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-4">Purchase Course</h3>
          <p className="mb-6">Please complete the payment to access this course.</p>
          {/* Payment UI elements */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full border border-gray-300 rounded px-4 py-2"
              disabled
            />
            <input
              type="text"
              placeholder="Expiry Date"
              className="w-full border border-gray-300 rounded px-4 py-2"
              disabled
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full border border-gray-300 rounded px-4 py-2"
              disabled
            />
            <button
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
              disabled
            >
              Pay Now (UI Only)
            </button>
            <button
              className="w-full mt-4 text-gray-600 underline"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

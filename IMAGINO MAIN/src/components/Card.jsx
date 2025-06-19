import React from 'react';


const Card = ({ image, alt, title, titleColor, description, btnColor, btnHoverColor, link }) => {
  return (
    <div className="bg-black shadow-lg rounded-lg overflow-hidden relative flex flex-col h-full">
      <img src={image} alt={alt || title || 'Course image'} className="w-full h-64 object-cover" width="400" height="256" loading="lazy" decoding="async" />
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <h3 className={`text-3xl font-semibold whitespace-pre-line ${titleColor} mb-2`}>{title}</h3>
        <p className="text-white mb-4 two-lines flex-1">{description}</p>
        <div className="flex items-end justify-start mt-auto">
          <a href={link || "/lectureview"}
            className={`inline-block ${btnColor} hover:${btnHoverColor} text-black px-4 py-2 rounded-full`}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
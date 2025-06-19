import React from 'react'
import { BorderBeam } from "./magicui/border-beam";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const Hero = () => {
  const codeLines = [
    'def greet(name):',
    '    print(f"Hello, {name}!")',
    '',
    'greet("Imagino")',
  ];

  function TypewriterCode() {
    const [displayed, setDisplayed] = React.useState('');
    const [line, setLine] = React.useState(0);
    const [char, setChar] = React.useState(0);

    React.useEffect(() => {
      if (line < codeLines.length) {
        if (char < codeLines[line].length) {
          const timeout = setTimeout(() => {
            setDisplayed(prev => prev + codeLines[line][char]);
            setChar(char + 1);
          }, 40);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setDisplayed(prev => prev + '\n');
            setLine(line + 1);
            setChar(0);
          }, 400);
          return () => clearTimeout(timeout);
        }
      } else {
        const timeout = setTimeout(() => {
          setDisplayed('');
          setLine(0);
          setChar(0);
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }, [line, char]);

    return (
      <pre style={{ background: 'transparent', margin: 0, padding: 0, fontFamily: 'monospace', fontSize: '1rem', color: '#333' }}>
        {displayed}
      </pre>
    );
  }

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row font-semibold overflow-x-hidden text-3xl sm:text-4xl lg:text-5xl'>
      {/* Left Content Section */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-start px-4 sm:px-6 lg:p-15 py-8 lg:py-0'>
        <h1 className='mb-2 lg:-mt-10' style={{fontFamily: 'system-ui, sans-serif'}}>Coding With Fun</h1>
        <h1 className='mb-6 lg:mb-0' style={{fontFamily: 'system-ui, sans-serif'}}>Growing With Skills !</h1>
        
        {/* Feature Cards */}
        <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 lg:gap-6 items-start mt-6 lg:mt-8 mb-4">
          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 sm:px-4 py-2 shadow-sm w-full sm:w-auto">
            <svg width="20" height="20" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3"/></svg>
            <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">Start Early, Stay Ahead</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 sm:px-4 py-2 shadow-sm w-full sm:w-auto">
            <svg width="20" height="20" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h8"/></svg>
            <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">Where Screen Time Becomes Skill Time</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 sm:px-4 py-2 shadow-sm w-full sm:w-auto">
            <svg width="20" height="20" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="7" width="20" height="10" rx="5" strokeWidth="2"/><circle cx="7" cy="12" r="1.5" fill="currentColor"/><circle cx="17" cy="12" r="1.5" fill="currentColor"/></svg>
            <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">Learn Like It's a Game — Because It Is</span>
          </div>
          
          {/* Game Feature Badges */}
          <div className="w-full flex flex-row flex-wrap gap-2 sm:gap-3 mt-2 mb-2 justify-start">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl border-2 border-blue-400 px-3 sm:px-4 py-2 shadow min-w-[120px] text-xs sm:text-sm">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="font-semibold">Weekly Quest</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl border-2 border-pink-400 px-3 sm:px-4 py-2 shadow min-w-[120px] text-xs sm:text-sm">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h.01M12 4a8 8 0 018 8c0 3.87-3.13 7-7 7s-7-3.13-7-7a8 8 0 018-8zm0 0v4m0 4h.01"/></svg>
              <span className="font-semibold">Regular Quizzes</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl border-2 border-green-400 px-3 sm:px-4 py-2 shadow min-w-[120px] text-xs sm:text-sm">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8a8 8 0 0016 0"/></svg>
              <span className="font-semibold">Live Leaderboard</span>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="w-full flex justify-start mt-4">
          <InteractiveHoverButton
            className="w-fit text-lg sm:text-xl lg:text-2xl -mt-3 py-3 sm:py-4 px-6 sm:px-8 shadow-black-500 shadow-lg hover:shadow-2xl hover:shadow-blue-400/40 transition-shadow duration-300">
            Get Started
          </InteractiveHoverButton>
        </div>
      </div>
      
      {/* Right Code Editor Section */}
      <div className='w-full lg:w-1/2 flex items-center justify-center rounded-2xl h-auto lg:h-screen relative px-4 sm:px-6 lg:px-0 py-8 lg:py-0'>
        <div className='relative w-full max-w-[600px] lg:w-[600px] h-[280px] sm:h-[320px] lg:h-[340px] bg-gray-100 rounded-2xl shadow-lg border border-gray-300 flex flex-col overflow-hidden'>
          {/* Terminal Header */}
          <div className='flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-200 border-b border-gray-300'>
            <span className='w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 inline-block'></span>
            <span className='w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 inline-block'></span>
            <span className='w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 inline-block'></span>
            <span className='ml-2 sm:ml-4 text-xs text-gray-500'>main.py</span>
          </div>
          
          {/* Code Content */}
          <div className='flex-1 font-mono text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 text-gray-800 bg-gray-50 whitespace-pre-wrap' style={{minHeight: '4em'}}>
            <TypewriterCode />
          </div>
          
          {/* Border Beams */}
          <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
          <BorderBeam duration={6} delay={3} size={400} className="from-transparent via-blue-500 to-transparent" />
        </div>
      </div>
    </div>
  )
}

export default Hero
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Code, Users, Target, Zap, BookOpen, Trophy, Star, Play, ArrowRight } from 'lucide-react';
import SkillcypherLogo from '../images/Skillcypher.svg';
import antaraImg from '../images/team/antara.jpg';
import gayatriImg from '../images/team/gayatri.jpg';
import yashImg from '../images/team/yash.jpg';
import sumeetImg from '../images/team/sumeet.jpg';
import rishaImg from '../images/team/risha.jpeg';
import vaishnaveeImg from '../images/team/vaishnavee.jpg';
import bgImg from '../images/bg.jpeg';
import Nav from '../components/Nav';



export default function AboutUs() {
  const [activeApproach, setActiveApproach] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTeamMember, setActiveTeamMember] = useState(1);
  const teamSectionRef = useRef(null);
  const teamCardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!teamSectionRef.current) return;
      const section = teamSectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;
      teamCardsRef.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestIdx = index;
        }
      });
      setActiveTeamMember(closestIdx);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent auto-scroll to team section on initial load
  useEffect(() => {
    let isFirstRender = true;
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    // Scroll the active card into center view smoothly
    const card = teamCardsRef.current[activeTeamMember];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [activeTeamMember]);

  const approachSteps = [
    { icon: <BookOpen className="w-8 h-8" />, title: "Learn", desc: "Interactive coding lessons with gamified content" },
    { icon: <Code className="w-8 h-8" />, title: "Apply", desc: "Hands-on projects and coding challenges" },
    { icon: <Zap className="w-8 h-8" />, title: "Build", desc: "Create real projects and showcase skills" },
    { icon: <Users className="w-8 h-8" />, title: "Share", desc: "Collaborate and present to the community" }
  ];

  const offerings = [
    { icon: "🎮", title: "Gamified Lessons", desc: "Turn coding into an adventure with interactive games" },
    { icon: "🧠", title: "Concept-Based Games", desc: "Learn programming logic through fun challenges" },
    { icon: "📹", title: "Recorded + Live Video Classes", desc: "Real-time learning with expert instructors" },
    { icon: "💬", title: "Doubt Support", desc: "24/7 help and peer discussion forums" },
    { icon: "📊", title: "Progress Tracking", desc: "Monitor learning journey with detailed analytics" },
    { icon: "🏆", title: "Challenges & Rewards", desc: "Leaderboards, quizzes, and achievement badges" }
  ];

  const team = [
    {
      name: "Yash Bhandari",
      role: "Co-Founder & CEO",
      desc: "A visionary student entrepreneur passionate about early coding education.With a strong product mindset, hands-on technical expertise, and a deep commitment to empowering young learners, he leads the team in building engaging, accessible tech experiences for school students across India.",
      img: yashImg
    },
    {
      name: "Sumeet Suryawanshi",
      role: "Co-Founder & CTO",
      desc: "An innovative engineering student with a deep interest in technology and learning systems. Sumeet oversees the technical strategy, constantly exploring new tools and ideas to enhance the platform's performance, scalability, and user experience.",
      img: sumeetImg
    },
    {
      name: "Arjun Chaudhary",
      role: "Co-Founder & CFO",
      desc: "Arjun is a passionate Python educator dedicated to making coding simple, fun, and approachable for school students. Through engaging explanations and hands-on guidance, he helps young learners build strong programming fundamentals from the ground up.",
      img: ''
    },
    {
      name: "Vaishnavee dixit",
      role: "Co-Founder , COO & CMO",
      desc: "A creative thinker with a flair for marketing and design, Vaishnavee leads the branding and outreach efforts. She crafts compelling campaigns that help the platform connect with students, parents, and educators across India.",
      img: vaishnaveeImg
    },
    {
      name: "Risha Upalekar",
      role: "Co-Founder & SEO Speacialist",
      desc: "With a strong grasp of digital marketing, Risha ensures TeamImagino's content ranks and reaches the right audience. Her expertise in SEO and content strategy helps grow the platform's visibility and credibility online.",
      img: rishaImg
    },
    {
      name: "Gayatri Hurpade",
      role: "Co-Founder & CCO",
      desc: "Gayatri leads our community engagement efforts, helping build a supportive and interactive environment for students. She focuses on feedback, communication, and ensuring that learners stay connected, motivated, and involved throughout their coding journey.",
      img: gayatriImg
    },
    {
      name: "Antara Bahule",
      role: "Co-Founder & CIO",
      desc: "Antara manages internal systems and educational content workflows. With a strong sense of organization and strategic thinking, she ensures operations run smoothly and content is delivered effectively across the platform.",
      img: antaraImg
    },
    {
      name: "Shubham Jadhav",
      role: "Co-Founder & CCMO",
      desc: "Shubham blends creativity with communication, driving our marketing initiatives and partnerships. As a student deeply involved in youth communities, he brings fresh energy to our outreach efforts.",
      img: ""
    },
  ];

  const faqs = [
    { q: "Is this suitable for complete beginners?", a: "Absolutely! Our courses are designed for kids with zero coding experience. We start with visual programming and gradually introduce text-based coding." },
    { q: "Do kids need their own laptop?", a: "Yes, students need access to a computer/laptop with internet connection. We support Windows, Mac, and Chrome OS." },
    { q: "What's the class schedule like?", a: "We offer flexible timings including weekends. Live classes are 1-2 hours long, with self-paced content available 24/7." },
    { q: "Do you provide certificates?", a: "Yes! Students receive certificates upon course completion and can showcase their projects in our digital portfolio." }
  ];

  return (
    <>
   <Nav />
    <div className="min-h-screen bg-white text-[#1a237e]">
      {/* Hero Section - Our Story */}
      <section className="relative px-6 py-20 text-center shadow-lg min-h-[350px] flex items-center m-10 rounded justify-center overflow-hidden">
        {/* Blurred background image */}
        <div className="absolute inset-0 w-full h-full z-1">
          <img
            src={bgImg}
            alt="Background"
            className="w-full h-full object-cover blur-md scale-105 opacity-80"
            style={{objectPosition: 'center'}}
          />
        </div>
        <div className="relative max-w-4xl mx-auto z-10 -mt-20 ">
         
                  <div className="flex justify-center mb-6">
                    <img
                    src={SkillcypherLogo}
                    alt="SkillCypher Logo"
                    className="h-24 md:h-32 lg:h-60"
                    style={{ maxWidth: 320 }}
                    />
                  </div>
                  <div className="text-xl md:text-2xl mb-8 text-black leading-relaxed z-10 -mt-20">
                  <p className="mb-4 text-3xl md:text-4xl font-bold drop-shadow-[0_2px_8px_rgba(26,35,126,0.7)]">
                    It started with a simple idea: <span className="text-[#54F4B9] font-semibold drop-shadow-[0_2px_8px_rgba(84,244,185,0.7)]">"If I had learned this in school, I would’ve built my startup years earlier."</span>
                  </p>
                  <p className="mb-4 font-semibold drop-shadow-[0_2px_8px_rgba(26,35,126,0.7)]">
                    At SkillCypher, we believe every child is a creator. Our platform transforms curiosity into real coding skills through interactive lessons, playful challenges, and a vibrant community.
                  </p>
                  <p className="text-white font-semibold drop-shadow-[0_2px_8px_rgba(26,35,126,0.9)]">
                    We’re here to empower the next generation of innovators, leaders, and dreamers—one line of code at a time.
                  </p>
                  </div>
                  </div>
              </section>
              <section className="px-6 py-16">
              <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-lg p-10 border border-[#e6fcf3]">
                <Target className="w-16 h-16 mx-auto mb-6 text-[#54F4B9]" />
                <h2 className="text-4xl font-bold mb-6 text-[#1a237e]">Our Mission</h2>
                <p className="text-2xl text-[#1a237e] leading-relaxed">
                To empower young minds with early coding skills that shape their future as 
                <span className="text-[#54F4B9] font-semibold"> builders</span>, 
                <span className="text-[#1a237e] font-semibold"> leaders</span>, and 
                <span className="text-[#ACE1AF] font-semibold"> creators</span>.
                </p>
              </div>
              </section>

              {/* Why Start Early */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a237e]">Why Start Early?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🧩", title: "Problem-Solving", desc: "Develops logical thinking and analytical skills from an early age" },
              { icon: "🎨", title: "Creativity", desc: "Encourages innovative thinking and creative expression through code" },
              { icon: "🚀", title: "Future-Ready", desc: "Prepares kids for a digital world where coding is essential" },
              { icon: "💪", title: "Confidence", desc: "Builds self-esteem and career awareness early in life" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 hover:bg-[#e6fcf3] transition-all duration-300 transform hover:scale-105 shadow-md border border-[#e6fcf3]">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#54F4B9]">{item.title}</h3>
                <p className="text-[#1a237e] opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a237e]">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offer, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 hover:bg-[#e6fcf3] transition-all duration-300 group shadow-md border border-[#e6fcf3]">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{offer.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#1a237e]">{offer.title}</h3>
                <p className="text-[#1a237e] opacity-80">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#1a237e]">Our Approach</h2>
          <p className="text-xl text-center mb-12 text-[#1a237e] max-w-3xl mx-auto">
            We don't just teach kids how to code. We teach them how to <span className="text-[#54F4B9] font-bold">think</span> like creators,
            <span className="text-[#1a237e] font-bold"> solve</span> like innovators, and <span className="text-[#ACE1AF] font-bold">lead</span> like founders.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {approachSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveApproach(idx)}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  activeApproach === idx ? 'bg-[#54F4B9] scale-110 text-white' : 'bg-gray-200 group-hover:bg-gray-300 text-gray-600'
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1a237e]">{step.title}</h3>
                <p className="text-center text-gray-600 text-sm max-w-40">{step.desc}</p>
                {idx < approachSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 mt-4 md:mt-0 md:ml-8 text-gray-400 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section ref={teamSectionRef} className="px-6 py-20 bg-gray-50 min-h-screen flex items-center relative overflow-x-hidden">
        {/* Blurred overlay for background focus effect */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-500" style={{backdropFilter: 'blur(8px)', opacity: 0.5, zIndex: 1, display: activeTeamMember !== null ? 'block' : 'none'}} />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1a237e]">Meet the Team</h2>
          <div className="flex flex-col gap-16">
            {team.map((member, idx) => (
              <div
                key={idx}
                ref={el => teamCardsRef.current[idx] = el}
                className={`relative bg-white rounded-2xl p-8 md:p-12 transition-all duration-700 ease-out transform border border-[#e6fcf3] ${
                  activeTeamMember === idx
                    ? 'scale-110 shadow-2xl z-20 ring-2 ring-[#54F4B9]/50'
                    : 'scale-95 opacity-60 blur-sm z-0'
                } hover:shadow-lg w-full max-w-6xl mx-auto`}
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#e6fcf3] shadow"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-200 flex items-center justify-center text-6xl md:text-8xl transition-transform duration-500">
                        {member.image}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 text-[#54F4B9]">{member.name}</h3>
                    <p className="text-[#1a237e] font-medium mb-6 text-xl md:text-2xl opacity-80">{member.role}</p>
                    <p className="text-[#1a237e] text-lg md:text-xl leading-relaxed opacity-80">{member.desc}</p>

                    {/* Additional visual elements for active member */}
                    {activeTeamMember === idx && (
                      <div className="mt-6 flex justify-center md:justify-start">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#54F4B9] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#1a237e] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#ACE1AF] rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spotlight effect for active member */}
                {activeTeamMember === idx && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#54F4B9]/10 to-[#1a237e]/10 rounded-2xl animate-pulse pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-16 space-x-4">
            {team.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTeamMember(idx)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeTeamMember === idx
                    ? 'bg-[#54F4B9] w-12 shadow-lg shadow-[#54F4B9]/50'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#1a237e]">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              { number: "10,000+", label: "Young Coders Empowered" },
              { number: "25,000+", label: "Projects & Games Built" },
              { number: "99%", label: "Parent & Student Satisfaction" },
              { number: "1,000+", label: "Community Events & Hackathons" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-[#e6fcf3]">
                <div className="text-4xl font-bold text-[#54F4B9] mb-2">{stat.number}</div>
                <div className="text-[#1a237e] opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-md border border-[#e6fcf3]">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#facc15] fill-current" />
              ))}
            </div>
            <p className="text-lg italic text-[#1a237e] mb-4 opacity-80">
              "My son never thought coding could be this much fun! Imagino’s dashboard, live classes, and real-time progress tracking keep him motivated every day."
            </p>
            <p className="text-[#54F4B9] font-medium">- A. Sharma, Parent</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a237e]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-[#e6fcf3]">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span className="font-medium text-lg text-[#1a237e]">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''} text-gray-600`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-[#1a237e]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#e6fcf3]/60 to-[#54F4B9]/60 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-[#1a237e]">Join the Imagino Movement</h2>
          <p className="text-xl text-[#1a237e] mb-12 opacity-80">
            Ready to unlock your child’s creative potential? Start their Imagino journey today!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-[#54F4B9] to-[#1a237e] hover:from-[#54F4B9]/80 hover:to-[#1a237e]/80 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-white shadow-lg">
              <Play className="w-5 h-5" />
              Book a Free Demo
            </button>
            <button className="bg-gradient-to-r from-[#1a237e] to-[#ACE1AF] hover:from-[#1a237e]/80 hover:to-[#ACE1AF]/80 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 text-white shadow-lg">
              Explore Courses
            </button>
            <button className="border-2 border-[#54F4B9]/30 hover:border-[#54F4B9]/60 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 text-[#1a237e] bg-white shadow">
              Partner with Us
            </button>
          </div>
          <div className="mt-12 text-[#54F4B9]">
            <p>Questions? Reach out to us at <span className="text-[#1a237e]">hello@imagino.in</span></p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

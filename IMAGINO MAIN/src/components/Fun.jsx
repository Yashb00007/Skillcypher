import React from 'react'
import { HyperText } from "./magicui/hyper-text";
import { OrbitingCircles } from "./magicui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";
import github from '../images/imagino.png'; // Example: replace with your own icon images
import python from '../images/python.svg';
import java from '../images/java.svg';
import canva from '../images/canva.svg';
import react from '../images/react.svg';
import cpp from '../images/cpp.svg';
import js from '../images/js.svg';
import html from '../images/html.svg';
import css from '../images/css.svg';
import node from '../images/node.svg';
import sql from '../images/sql.svg';
import angular from '../images/angular.svg';

const Fun = () => {
  return (
    <div className='w-full h-screen rounded-2xl flex flex-col md:flex-row font-semibold overflow-x-hidden overflow-y-hidden text-5xl bg-black text-[#54F4B9]'>
      
      <div className='w-full md:w-1/2 flex flex-col justify-center items-start p-5 md:p-15'>
        <HyperText>GET READY TO UPSKILL</HyperText> 
        <div className='rounded-2xl'>
          <HyperText className="text-xl md:text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur minima architecto nostrum aut beatae quibusdam harum? Neque modi distinctio, eaque excepturi error sint nam maxime molestiae fugit id a culpa?
          </HyperText>
        </div>   
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center relative overflow-visible h-[70vh] md:h-dvh'>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <OrbitingCircles radius={175} iconSize={60} path={true}>
            <img src={canva} alt="canva" style={{ width: 60, height: 60, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={css} alt="css" style={{ width: 60, height: 60, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={python} alt="python" style={{ width: 60, height: 60, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={cpp} alt="cpp" style={{ width: 60, height: 60, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={html} alt="html" style={{ width: 60, height: 60, borderRadius: '50%' }} loading="lazy" decoding="async" />
          </OrbitingCircles>
          <OrbitingCircles radius={100} reverse iconSize={40} path={true}>
            <img src={react} alt="react" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={sql} alt="sql" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={java} alt="java" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={node} alt="node" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={angular} alt="angular" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
            <img src={js} alt="js" style={{ width: 40, height: 40, borderRadius: '50%' }} loading="lazy" decoding="async" />
          </OrbitingCircles>
        </div>
      </div>

    </div>
  )
}

export default Fun;

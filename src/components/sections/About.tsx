'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionWrapper from "../SectionWrapper";

const slides = [

{
title: "Designed for High-Performance Hiring Teams",
paragraphs: [
"We built it inside a staffing company while running real submissions.",
"Managing real candidates while losing real deals to slow manual processes.",
"Every day looked the same:",
],
bullets: [
"Too many job boards",
"Too many ATS portals",
"Too many forms to fill"
],
end: [
"And never enough time.",
"By the time a recruiter found the right role, tailored the profile, and submitted the application , the window was often gone.",
"The job was already flooded.",
"The opportunity was already lost.",
"We lived in that chaos."
]
},

{
title: "The Operational Reality",
paragraphs: [
"Managing candidates across multiple platforms isn't just tedious.",
"It's inconsistent, error-prone, and impossible to scale",
"It costs recruiting teams in three major ways:"
],
bullets: [
"Missed application windows",
"Slower submission velocity than competitors",
"No reliable visibility into what was applied, when, and for whom"
],
end: [
"That’s how good candidates fall through the cracks.",
"That’s how great opportunities get missed.",
"That’s how recruiters burn hours on copy-paste work instead of closing placements."
]
},

{
title: "The Core Belief Behind Job Jarvis",
paragraphs: [
"Recruiters shouldn’t be doing robot work.",
"Job Jarvis centralizes job discovery, candidate matching, and application execution across:"
],
bullets: [
"ATS portals",
"Company career sites",
"Startup ecosystems",
"GitHub organizations",
"Social Platforms (Linkedin/X)",
"Niche recruiting communities",
"Recruiter distribution channels"
],
end: [
"It also powers recruiter outreach and referral campaigns so teams can move faster and operate at scale."
]
},

{
title: "One Unified Submission Engine",
paragraphs: [
"Instead of juggling tabs, spreadsheets, and inboxes, Jobjarvis makes everything run in one place."
],
bullets: [
"Centralized job intake pipeline",
"Candidate-level job matching",
"Automated compliant application workflows",
"Real-time tracking and reporting across all submissions"
],
end: []
},

{
title: "The Result",
paragraphs: [],
bullets: [
"Faster submission cycles.",
"Broader job board coverage.",
"Fewer manual errors.",
"Full operational visibility across submissions."
],
end: [
"More time spent on what actually drives revenue: relationships, interviews, and placements",
"We built Job Jarvis for staffing teams, bench sales recruiters, and high-volume hiring operations who are tired of losing opportunities to speed, scale, and manual chaos."
]
}

];

export default function About() {

const [index,setIndex] = useState(0);

useEffect(()=>{

const timer = setInterval(()=>{
setIndex(prev => (prev+1) % slides.length);
},6000);

return ()=> clearInterval(timer);

},[]);

const nextSlide = () =>{
setIndex(prev => (prev+1) % slides.length);
}

const prevSlide = () =>{
setIndex(prev => (prev-1 + slides.length) % slides.length);
}

return(

<SectionWrapper id="about" className="relative">

{/* glow */}
<div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-violet-500/5 rounded-full blur-[90px] pointer-events-none"/>

<div className="max-w-2xl mx-auto relative z-10">

{/* label */}

<motion.span
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
className="block text-center text-blue-400 text-[11px] font-semibold tracking-widest uppercase mb-2"
>
About Job Jarvis
</motion.span>

{/* heading */}

<motion.h2
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:0.1}}
className="text-center text-xl sm:text-2xl font-bold text-white mb-6"
>
Built for <span className="text-gradient">Modern Recruiting Teams</span>
</motion.h2>

{/* card */}

<motion.div
key={index}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.35}}
className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/60 rounded-lg px-5 py-5"
>

<h3 className="text-center text-base font-semibold text-white mb-4">
{slides[index].title}
</h3>

<div className="text-[14px] text-slate-400 leading-relaxed space-y-3 text-justify">

{slides[index].paragraphs.map((p,i)=>(
<p key={i}>{p}</p>
))}

{slides[index].bullets.length > 0 && (
<ul className="space-y-1 pl-4">
{slides[index].bullets.map((b,i)=>(
<li key={i} className="list-disc marker:text-blue-400">
{b}
</li>
))}
</ul>
)}

{slides[index].end.map((e,i)=>(
<p key={i}>{e}</p>
))}

</div>

</motion.div>

{/* controls */}

<div className="flex items-center justify-center gap-4 mt-5">

<button
onClick={prevSlide}
className="px-3 py-1 text-xs border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800 transition"
>
Prev
</button>

<div className="flex gap-2">
{slides.map((_,i)=>(
<div
key={i}
className={`h-[5px] rounded-full transition-all ${
i===index ? "w-5 bg-blue-400" : "w-2 bg-slate-700"
}`}
/>
))}
</div>

<button
onClick={nextSlide}
className="px-3 py-1 text-xs border border-slate-700 rounded-md text-slate-300 hover:bg-slate-800 transition"
>
Next
</button>

</div>

</div>

</SectionWrapper>

);
}
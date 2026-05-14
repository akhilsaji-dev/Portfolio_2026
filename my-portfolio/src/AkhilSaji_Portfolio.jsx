
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import profileImg from "./assets/profile.jpg";


// iconss
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiBootstrap,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiDjango,
  SiGit,
  SiGithub,
  SiPostman,
  SiJsonwebtokens,
  SiVercel,
  SiNetlify,
  SiLinux,
  SiMysql,
  SiC,
  SiCplusplus,
   SiSharp,
} from "react-icons/si";
// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Languages": ["JavaScript (ES6+)", "Python", "Java", "C#", "C", "C++", ],
  "Frontend": ["React.js", "Tailwind CSS", "Framer Motion", "Bootstrap", "Material UI"],
  "Backend": ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Django REST Framework", "MySQL"],
  "Tools": ["Git", "GitHub", "Postman", "JWT", "Vercel", "Netlify", "Linux"],
};
const SKILL_ICONS = {
  "JavaScript (ES6+)": <SiJavascript color="#F7DF1E" />,
  "Python": <SiPython color="#3776AB" />,
  "C#": <SiSharp color="#99CC00" />,
  "C": <SiC color="#A8B9CC" />,
  "C++": <SiCplusplus color="#00599C" />,

  "React.js": <SiReact color="#61DAFB" />,
  "Tailwind CSS": <SiTailwindcss color="#06B6D4" />,
  "Framer Motion": <SiFramer color="#0055FF" />,
  "Bootstrap": <SiBootstrap color="#7952B3" />,
  "Material UI": <SiMui color="#007FFF" />,

  "Node.js": <SiNodedotjs color="#339933" />,
  "Express.js": <SiExpress color="#FFFFFF" />,
  "MongoDB": <SiMongodb color="#47A248" />,
  "RESTful APIs": <SiJsonwebtokens color="#000000" />,
  "Django REST Framework": <SiDjango color="#092E20" />,
  "MySQL": <SiMysql color="#4479A1" />,

  "Git": <SiGit color="#F05032" />,
  "GitHub": <SiGithub color="#FFFFFF" />,
  "Postman": <SiPostman color="#FF6C37" />,
  "JWT": <SiJsonwebtokens color="#000000" />,
  "Vercel": <SiVercel color="#FFFFFF" />,
  "Netlify": <SiNetlify color="#00C7B7" />,
  "Linux": <SiLinux color="#FCC624" />,
};

const EXPERIENCE = [
  {
    role: "Software Faculty",
    company: "G Tech Computer Education",
    period: "July 2025 – Present",
    location: "Thodupuzha, Idukki, Kerala",
    color: "#00f5ff",
    desc: [
      "Train students in MERN Stack, Python, and MS Office with clear and practical teaching.",
      "Guide learners with hands-on exercises, live demos, and regular practice sessions.",
      "Break down complex topics for beginners and build student confidence through real-world problem solving.",
    ],
  },
  {
    role: "Programming Instructor & Project Support Intern",
    company: "Infonix Solutions",
    period: "Apr 2025 – July 2025",
    location: "Thodupuzha, Idukki, Kerala",
    color: "#a855f7",
    desc: [
      "Trained 20+ students in React and MySQL with a focus on real-world web dev practices.",
      "Provided hands-on support for academic and client projects including backend integration and debugging.",
      "Mentored students through the full project lifecycle — UI/UX, database design, deployment, and documentation.",
    ],
  },
  {
    role: "MERN Stack Development Intern",
    company: "Syneefo Solutions",
    period: "Jan 2025 – Feb 2025",
    location: "Kerala",
    color: "#06b6d4",
    desc: [
      "Built and deployed full-stack apps using MERN stack for real-world projects.",
      "Developed RESTful APIs and integrated JWT-based authentication.",
      "Worked on an e-commerce site and portfolio system with responsive Tailwind CSS UI.",
    ],
  },
];

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Clothing Store",
    desc: "A full-stack fashion retail platform where users can browse products, apply advanced filters (gender, size, category), view variants, manage cart, and complete secure checkouts. Features real-time stock updates and a smooth shopping flow built for scalability.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "cyan",
    icon: "🛍️",
  },
  {
    title: "Real Estate App",
    subtitle: "Modern Property Platform",
    desc: "A web-based platform designed to simplify property browsing and enhance user experience. Provides a seamless way to browse, list, and manage properties with advanced search/filtering, interactive listings, and real-time availability updates.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "React Router DOM"],
    gradient: "from-purple-500/20 to-pink-600/20",
    border: "purple",
    icon: "🏠",
  },
  {
    title: "Personal Portfolio",
    subtitle: "Interactive Developer Showcase",
    desc: "A personal platform crafted to showcase front-end development skills, creative projects, and design sensibilities. Built with React.js and Framer Motion — smooth transitions, component-based design, and modern interactive UIs.",
    stack: ["React.js", "Framer Motion", "Tailwind CSS"],
    gradient: "from-blue-500/20 to-violet-600/20",
    border: "blue",
    icon: "✨",
  },
];

const EDUCATION = [
  {
    degree: "Diploma in Computer Engineering",
    school: "Govt. Polytechnic College Muttom",
    period: "June 2021 – April 2024",
    grade: "CGPA: 6.9",
    color: "#00f5ff",
  },
  {
    degree: "Plus Two (Higher Secondary)",
    school: "MKNMHSS Kumaramangalam",
    period: "June 2019 – April 2021",
    grade: "Percentage: 91%",
    color: "#a855f7",
  },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.6, delay: i * 0.1 } }),
};

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full border-t-2 border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan-400 font-mono text-xl font-bold">AS</span>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-cyan-400/70 font-mono text-sm tracking-[0.3em]"
      >
        LOADING PORTFOLIO
      </motion.p>
      <motion.div
        className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
}

// ─── CURSOR GLOW ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const { x, y } = useMousePosition();
  const springConfig = { stiffness: 120, damping: 25 };
  const cx = useSpring(x, springConfig);
  const cy = useSpring(y, springConfig);
  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] w-96 h-96 rounded-full"
      style={{
        x: cx,
        y: cy,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────
function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute top-3/4 left-1/3 w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{ left: `${8 + i * 8}%`, top: `${20 + (i % 4) * 20}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const curr = window.scrollY;
      setHidden(curr > lastY.current && curr > 100);
      setScrolled(curr > 20);
      lastY.current = curr;
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-black/60 border-b border-cyan-500/10" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          className="font-mono text-xl font-bold tracking-wider"
          onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Akhil</span>
          <span className="text-white">.dev</span>
        </motion.a>
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                active === link.toLowerCase()
                  ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                  : "text-gray-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              {link}
            </motion.button>
          ))}
        </div>
        <motion.a
          href="mailto:akhilsaji0031@gmail.com"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,245,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
        >
          Hire Me
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative z-10 ${className}`}>
      {children}
    </section>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
function SectionTitle({ label, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="text-center mb-20">
      <motion.p
        variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}
        className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-3"
      >{label}</motion.p>
      <motion.h2
        variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
        style={{ textShadow: "0 0 40px rgba(0,245,255,0.2)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-gray-400 max-w-xl mx-auto text-lg"
        >{subtitle}</motion.p>
      )}
      <motion.div
        variants={fadeIn} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
        className="mt-6 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timeout = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text === word) setTimeout(() => setDel(true), 1500);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text === "") { setDel(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, del ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [text, del, idx, words]);
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
      {text}<span className="animate-pulse text-cyan-400"></span>
    </span>
  );
}

function Hero() {
  return (
    <Section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <span className="font-mono text-sm text-cyan-400/80 tracking-[0.4em] uppercase border border-cyan-400/20 px-4 py-2 rounded-full bg-cyan-400/5 backdrop-blur-sm">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black mb-4 leading-none tracking-tight"
        >
          <span className="text-white">Akhil </span>
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
            style={{ textShadow: "none", filter: "drop-shadow(0 0 40px rgba(0,245,255,0.4))" }}
          >
            Saji
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-2xl md:text-4xl font-bold mb-8 h-12"
        >
          <TypeWriter words={["MERN Stack Developer", "Full Stack Engineer", "React Specialist", "Node.js Developer", "Coding Instructor"]} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Crafting scalable web applications with the MERN stack. Passionate about clean code,
          stunning UIs, and building experiences that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,245,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
          >
            View My Work
          </motion.a>
          <motion.a
            href="mailto:akhilsaji0031@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-bold text-white border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 backdrop-blur-sm transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-6 justify-center"
        >
          {[
            { label: "GitHub", href: "https://github.com/akhilsaji-dev", icon: "GH" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/akhil-saji-7027892b5/?skipRedirect=true", icon: "LI" },
            { label: "Instagram", href: "https://www.instagram.com/akhi_l._/", icon: "IG" },
            { label: "Email", href: "mailto:akhilsaji0031@gmail.com", icon: "@" },
          ].map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 text-xs font-mono font-bold"
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
<br />
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400/50 to-transparent" />
        </motion.div>
      </div>
      <br />
    </Section>
    // <br />
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const stats = [
    { val: "3+", label: "Years Learning" },
    { val: "100+", label: "Students Trained" },
    { val: "5+", label: "Projects Built" },
    { val: "3", label: "Languages" },
  ];
  return (
    <Section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="// who am i" title="About Me" />
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar side */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5" />
      <img
      src={profileImg}
      alt="Akhil Saji"
      className="w-full h-full object-cover rounded-3xl"
    />
                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, rgba(0,245,255,0.3) 30%, transparent 60%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    padding: "1px",
                  }}
                />
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm px-3 py-1.5 rounded-xl text-cyan-400 text-sm font-mono"
              >
              MERN Developer
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-purple-500/10 border border-purple-400/30 backdrop-blur-sm px-3 py-1.5 rounded-xl text-purple-400 text-sm font-mono"
              >
              Educator
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.p
              variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-gray-300 text-lg leading-relaxed mb-6"
            >
              I'm a <span className="text-cyan-400 font-semibold">MERN Stack Developer</span> from Thodupuzha, Kerala — driven by a passion for crafting performant, beautiful web applications from the ground up.
            </motion.p>
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-gray-400 leading-relaxed mb-8"
            >
              Self-taught and highly motivated, I've built expertise through intensive courses, real-world projects, and currently teaching the next generation of developers at G Tech Computer Education. I bring both technical depth and communication clarity to everything I build.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.03, borderColor: "rgba(0,245,255,0.4)" }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                    {s.val}
                  </p>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
// function Skills() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });
//   const categoryColors = {
//     "Languages": "from-cyan-500 to-blue-500",
//     "Frontend": "from-purple-500 to-pink-500",
//     "Backend": "from-green-500 to-emerald-400",
//     "Tools": "from-orange-400 to-amber-400",
//   };
//   return (
//     <Section id="skills" className="py-32 px-6">
//       <div className="max-w-7xl mx-auto">
//         <SectionTitle label="// what i know" title="Technical Skills" subtitle="A curated toolkit of technologies I use to build powerful applications" />
//         <div ref={ref} className="grid md:grid-cols-2 gap-6">
//           {Object.entries(SKILLS).map(([cat, items], ci) => (
//             <motion.div
//               key={cat}
//               variants={fadeUp} custom={ci} initial="hidden" animate={inView ? "visible" : "hidden"}
//               whileHover={{ scale: 1.02 }}
//               className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className={`h-0.5 w-8 bg-gradient-to-r ${categoryColors[cat]}`} />
//                 <h3 className={`text-sm font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${categoryColors[cat]}`}>
//                   {cat}
//                 </h3>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {items.map((skill, si) => (
//                   <motion.div
//                     key={skill}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={inView ? { opacity: 1, scale: 1 } : {}}
//                     transition={{ delay: ci * 0.1 + si * 0.07 }}
//                     whileHover={{ scale: 1.1, y: -3 }}
//                     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/5 text-gray-300 hover:text-white text-sm transition-all duration-300 cursor-default"
//                   >
//                     <span>{SKILL_ICONS[skill] || "◆"}</span>
//                     <span className="font-medium">{skill}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// }
// function Skills() {
//   const ref = useRef(null);

//   const inView = useInView(ref, {
//     once: true,
//     margin: "-100px",
//   });

//   import {
//   Code2,
//   Palette,
//   ServerCog,
//   Wrench,
// } from "lucide-react";

// const categoryStyles = {
//   Languages: {
//     border: "border-cyan-400/30",
//     glow: "shadow-cyan-500/20",
//     icon: Code2,
//   },

//   Frontend: {
//     border: "border-pink-400/30",
//     glow: "shadow-pink-500/20",
//     icon: Palette,
//   },

//   Backend: {
//     border: "border-green-400/30",
//     glow: "shadow-green-500/20",
//     icon: ServerCog,
//   },

//   Tools: {
//     border: "border-orange-400/30",
//     glow: "shadow-orange-500/20",
//     icon: Wrench,
//   },
// };

//   return (
//     <Section
//       id="skills"
//       className="relative py-32 px-6 overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

//       <div className="relative max-w-7xl mx-auto">
//         <SectionTitle
//           label="// expertise"
//           title="Skills & Technologies"
//           subtitle="Modern technologies I use to build scalable and immersive digital products."
//         />

//         {/* Bento Grid Layout */}
//         <div
//           ref={ref}
//           className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20"
//         >
//           {Object.entries(SKILLS).map(([category, items], ci) => (
//             <motion.div
//               key={category}
//               initial={{ opacity: 0, y: 60 }}
//               animate={
//                 inView
//                   ? { opacity: 1, y: 0 }
//                   : {}
//               }
//               transition={{
//                 duration: 0.6,
//                 delay: ci * 0.15,
//               }}
//               whileHover={{
//                 y: -8,
//               }}
//               className={`group relative overflow-hidden rounded-[32px] border ${categoryStyles[category].border} bg-white/[0.03] backdrop-blur-xl p-7 transition-all duration-500 hover:shadow-2xl ${categoryStyles[category].glow}`}
//             >
//               {/* Glass Glow */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 to-transparent" />

//               {/* Top */}
//               <div className="relative flex items-center justify-between mb-8">
//                 <div>
//                   <p className="text-4xl">
//                     {categoryStyles[category].icon}
//                   </p>

//                   <h3 className="mt-4 text-xl font-bold text-white">
//                     {category}
//                   </h3>

//                   <p className="text-sm text-gray-500 mt-1">
//                     {items.length} Technologies
//                   </p>
//                 </div>

//                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-xl group-hover:rotate-12 transition duration-500">
//                   ✦
//                 </div>
//               </div>

//               {/* Skills */}
//               <div className="space-y-3">
//                 {items.map((skill, si) => (
//                   <motion.div
//                     key={skill}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={
//                       inView
//                         ? { opacity: 1, x: 0 }
//                         : {}
//                     }
//                     transition={{
//                       delay: ci * 0.12 + si * 0.05,
//                     }}
//                     whileHover={{
//                       scale: 1.03,
//                       x: 4,
//                     }}
//                     className="group/item relative overflow-hidden"
//                   >
//                     <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover/item:opacity-100 transition duration-300" />

//                     <div className="relative flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg">
//                           {SKILL_ICONS[skill] || "◆"}
//                         </span>

//                         <span className="text-sm font-medium text-gray-300">
//                           {skill}
//                         </span>
//                       </div>

//                       <div className="w-2 h-2 rounded-full bg-white/30 group-hover/item:bg-cyan-400 transition duration-300" />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Bottom Glow */}
//               <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full opacity-20" />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// }
import {
  Code2,
  Palette,
  ServerCog,
  Wrench,
  Sparkles,
} from "lucide-react";

function Skills() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const categoryStyles = {
    Languages: {
      border: "border-cyan-400/30",
      glow: "shadow-cyan-500/20",
      icon: Code2,
      iconColor: "text-cyan-400",
    },

    Frontend: {
      border: "border-pink-400/30",
      glow: "shadow-pink-500/20",
      icon: Palette,
      iconColor: "text-pink-400",
    },

    Backend: {
      border: "border-green-400/30",
      glow: "shadow-green-500/20",
      icon: ServerCog,
      iconColor: "text-green-400",
    },

    Tools: {
      border: "border-orange-400/30",
      glow: "shadow-orange-500/20",
      icon: Wrench,
      iconColor: "text-orange-400",
    },
  };

  return (
    
    <Section
      id="skills"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      <div className="relative max-w-7xl mx-auto">
        <SectionTitle
          label="// expertise"
          title="Skills & Technologies"
          subtitle="Modern technologies I use to build scalable and immersive digital products."
        />

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20"
        >
          {Object.entries(SKILLS).map(
            ([category, items], ci) => {
              const config =
                categoryStyles[category];

              const Icon = config.icon;

              return (
                <motion.div
                  key={category}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: ci * 0.15,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className={`group relative overflow-hidden rounded-[32px] border ${config.border} bg-white/[0.03] backdrop-blur-xl p-7 transition-all duration-500 hover:shadow-2xl ${config.glow}`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 to-transparent" />

                  {/* Top */}
                  <div className="relative flex items-center justify-between mb-8">
                    <div>
                      {/* Main Icon */}
                      <div
                        className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${config.iconColor}`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-white">
                        {category}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {items.length} Technologies
                      </p>
                    </div>

                    {/* Sparkle Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:rotate-12 transition duration-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    {items.map((skill, si) => (
                      <motion.div
                        key={skill}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={
                          inView
                            ? {
                                opacity: 1,
                                x: 0,
                              }
                            : {}
                        }
                        transition={{
                          delay:
                            ci * 0.12 +
                            si * 0.05,
                        }}
                        whileHover={{
                          scale: 1.03,
                          x: 4,
                        }}
                        className="group/item relative overflow-hidden"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover/item:opacity-100 transition duration-300" />

                        <div className="relative flex items-center justify-between px-4 py-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {SKILL_ICONS[
                                skill
                              ] || "◆"}
                            </span>

                            <span className="text-sm font-medium text-gray-300">
                              {skill}
                            </span>
                          </div>

                          <div className="w-2 h-2 rounded-full bg-white/30 group-hover/item:bg-cyan-400 transition duration-300" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full opacity-20" />
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </Section>
  );
}
// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <Section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="// where i've been" title="Experience" />
        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent hidden md:block" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"}
                className="relative md:pl-24"
              >
                {/* Timeline dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="absolute left-5 top-8 w-6 h-6 rounded-full border-2 hidden md:flex items-center justify-center"
                  style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{exp.role}</h3>
                      <p className="font-semibold mt-1" style={{ color: exp.color }}>{exp.company}</p>
                      <p className="text-gray-500 text-sm mt-1">{exp.location}</p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full border bg-white/5 text-gray-400" style={{ borderColor: `${exp.color}40` }}>
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.desc.map((d, di) => (
                      <li key={di} className="flex items-start gap-3 text-gray-400 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  const borderColors = { cyan: "rgba(0,245,255,0.3)", purple: "rgba(168,85,247,0.3)", blue: "rgba(59,130,246,0.3)" };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp} custom={index} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className="transition-transform duration-200"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-8 rounded-3xl bg-gradient-to-br ${project.gradient} border backdrop-blur-sm transition-all duration-500 h-full`}
        style={{ borderColor: borderColors[project.border] || "rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
            {project.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{project.subtitle}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-all duration-300 text-center"
          >
            🔗 Live Demo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/10 transition-all duration-300 text-center"
          >
            🐙 GitHub
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  return (
    <Section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="// what i've built" title="Featured Projects" subtitle="A selection of projects that demonstrate my skills and passion for building" />
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </Section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const certs = ["Diploma Certificate", "MERN Stack Certificate", "MERN Stack Internship Certificate"];
  return (
    <Section id="education" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="// my journey" title="Education & Certificates" />
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <motion.h3
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-lg font-mono text-cyan-400 tracking-widest uppercase mb-6"
            >▸ Academic</motion.h3>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: edu.color, boxShadow: `0 0 8px ${edu.color}` }} />
                    <div>
                      <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                      <p className="text-gray-400 text-sm mt-0.5">{edu.school}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500 font-mono">{edu.period}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10" style={{ color: edu.color }}>
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates + Languages */}
          <div>
            <motion.h3
              variants={fadeUp} custom={0.5} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-lg font-mono text-purple-400 tracking-widest uppercase mb-6"
            >▸ Certificates</motion.h3>
            <div className="space-y-3 mb-8">
              {certs.map((cert, i) => (
                <motion.div
                  key={cert}
                  variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 group"
                >
                  <span className="text-lg">🏅</span>
                  <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{cert}</span>
                </motion.div>
              ))}
            </div>

            <motion.h3
              variants={fadeUp} custom={4} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-lg font-mono text-blue-400 tracking-widest uppercase mb-4"
            >▸ Languages</motion.h3>
            <div className="flex gap-3 flex-wrap">
              {["English", "Malayalam", "Tamil"].map((lang, i) => (
                <motion.span
                  key={lang}
                  variants={fadeUp} custom={5 + i} initial="hidden" animate={inView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const links = [
    { label: "Email", value: "akhilsaji0031@gmail.com", href: "mailto:akhilsaji0031@gmail.com", icon: "✉️" },
    { label: "Phone", value: "+91 7909202767", href: "tel:+917909202767", icon: "📞" },
    { label: "Location", value: "Thodupuzha, Kerala, India", href: "#", icon: "📍" },
    { label: "GitHub", value: "github.com/akhilsaji", href: "https://github.com", icon: "🐙" },
  ];

  return (
    <Section id="contact" className="py-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="// let's connect" title="Get In Touch" subtitle="Have a project in mind or want to collaborate? Let's talk." />
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          >
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              I'm currently open to new opportunities and exciting projects. Whether you have a question, a proposal, or just want to say hi — my inbox is always open.
            </p>
            <div className="space-y-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300 group"
                >
                  <span className="text-xl w-8 text-center">{l.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{l.label}</p>
                    <p className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">{l.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="text-xs font-mono text-gray-400 tracking-wider uppercase block mb-2">{field.label}</label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-300"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="text-xs font-mono text-gray-400 tracking-wider uppercase block mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-300 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
              >
                {sent ? "✓ Message Sent!" : "Send Message →"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeIn} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-sm font-mono"
        >
          <p>Designed & Built by <span className="text-cyan-400">Akhil Saji</span> · 2026</p>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ["hero", "about", "skills", "experience", "projects", "education", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onComplete={() => setTimeout(() => setLoading(false), 200)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CursorGlow />
          <Background />
          <Navbar active={active} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
  );
}

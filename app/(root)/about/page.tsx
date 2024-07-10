"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Star,
  Check,
  Copy,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "react-hot-toast";

const teamMembers = [
  {
    name: "Elhamullah Hossaini",
    role: "Full Stack Developer",
    image: "/images/elham.jpg",
    socialLinks: {
      github: "https://github.com/ElhamDevelopmentStudio",
      twitter: "https://twitter.com/Elhamullah2",
      linkedin: "https://www.linkedin.com/in/elhamullah-hossaini-408287264",
    },
    email: "elhamullah.hossaini@gmail.com",
    phone: "+93 711 55 61 45",
    location: "Kabul, Afghanistan",
    bio: "Passionate about creating beautiful and responsive user interfaces. Specialized in React and Next.js.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Node Js",
      "Express Js",
      "GraphQL",
      "Mongo DB",
    ],
    achievements: ["Came in 9th in ICPC", "3+ Years Experience"],
  },
  {
    name: "Haroon Azizi",
    role: "Backend Developer",
    image: "/images/haroon.jpg",
    socialLinks: {
      github: "https://github.com/HaroonAzizi",
      twitter: "https://twitter.com/az_haroon",
      linkedin: "https://linkedin.com/in/haroonazizi",
    },
    email: "haroonazizi15@gmail.com",
    phone: "+93 782 80 38 48",
    location: "Kabul, Afghanistan",
    bio: "Experienced in building scalable and efficient server-side applications. Expert in Node.js and Python.",
    skills: ["Node.js", "Python", "MongoDB", "AWS"],
    achievements: [
      "Contributed to Open Source",
      "Developed highly feasible APIs",
    ],
  },
  {
    name: "Anas Kabir",
    role: "UI/UX",
    image: "/images/anas.jpg",
    socialLinks: {
      github: "https://github.com/kabir-sahib",
      twitter: "https://twitter.com/kabir_sahib7676",
      linkedin: "https://linkedin.com/in/anaskabir",
    },
    email: "anaskabir7676@gmail.com",
    phone: "+93 780 30 31 30",
    location: "Kabul, Afghanistan",
    bio: "Creative designer with a passion for crafting beautiful and functional user experiences. Specializes in UI/UX design.",
    skills: ["UI/UX Design", "Adobe Creative Suite", "Figma", "Sketch"],
    achievements: [
      "10+ Figma Achievements",
      "20+ Successful Designing Projects",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [activeTab, setActiveTab] = useState("bio");
  const controls = useAnimation();
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: "100% 50%",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 20,
      },
    },
  };

  const copyEmail = async (email: string) => {
    setCopying(true);
    await navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
    setCopying(false);
  };

  const iconComponents = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <Toaster position="bottom-center" />
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-7xl text-blue-700 font-extrabold mb-8 bg-clip-text text-transparent "
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          <div className="text-blue-600">Meet Our Exceptional Team</div>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          We are a group of passionate developers committed to building
          innovative solutions and pushing the boundaries of technology.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer transform perspective-1000"
              style={{
                boxShadow: "0 0 20px rgba(66, 153, 225, 0.5)",
              }}
              onClick={() => setSelectedMember(member)}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="relative w-40 h-40 mx-auto mb-6"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full ring-4 ring-indigo-500"
                />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2 text-indigo-300">
                {member.name}
              </h2>
              <p className="text-xl text-pink-400 mb-4">{member.role}</p>
              <p className="text-gray-300 mb-6 line-clamp-3">{member.bio}</p>
              <div className="flex justify-center gap-4">
                {Object.entries(member.socialLinks).map(([key, link], i) => {
                  const Icon =
                    iconComponents[key as keyof typeof iconComponents];
                  return (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-indigo-600 p-2 rounded-full"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl max-w-4xl w-full shadow-2xl "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row items-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-40 h-40 mb-4 md:mb-0 md:mr-6"
                >
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full ring-4 ring-indigo-500"
                  />
                </motion.div>
                <div className="text-center md:text-left">
                  <h2 className="text-4xl font-bold text-indigo-300">
                    {selectedMember.name}
                  </h2>
                  <p className="text-2xl text-pink-400">
                    {selectedMember.role}
                  </p>
                  <div className="flex justify-center md:justify-start mt-4 space-x-4">
                    {Object.entries(selectedMember.socialLinks).map(
                      ([key, link], i) => {
                        const IconComponent =
                          iconComponents[key as keyof typeof iconComponents];
                        return IconComponent ? (
                          <motion.a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-indigo-600 p-2 rounded-full"
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.a>
                        ) : null;
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  {["bio", "skills", "achievements"].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 mx-2 rounded-full ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "bio" && (
                      <p className="text-xl text-gray-300">
                        {selectedMember.bio}
                      </p>
                    )}
                    {activeTab === "skills" && (
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 rounded-full text-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    )}
                    {activeTab === "achievements" && (
                      <ul className="list-none space-y-2">
                        {selectedMember.achievements.map(
                          (achievement, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center text-gray-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Star className="w-5 h-5 mr-2 text-yellow-400" />
                              {achievement}
                            </motion.li>
                          )
                        )}
                      </ul>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center bg-gray-700 p-3 rounded-lg "
                  whileHover={{ scale: 1.05 }}
                >
                  {copying ? (
                    <Check className="w-6 h-6 mr-2 text-green-400" />
                  ) : (
                    <Mail className="w-6 h-6 mr-2 text-indigo-400" />
                  )}
                  <span className="text-gray-300 pr-16">
                    {selectedMember.email}
                  </span>
                  <span
                    className="bg-indigo-500 flex text-gray-300 p-1 rounded-md cursor-pointer"
                    onClick={() => copyEmail(selectedMember.email)}
                  >
                    <Copy className="pr-1" />
                    Copy
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center bg-gray-700 p-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="w-6 h-6 mr-2 text-indigo-400" />
                  <span className="text-gray-300">{selectedMember.phone}</span>
                </motion.div>
                <motion.div
                  className="flex items-center bg-gray-700 p-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <MapPin className="w-6 h-6 mr-2 text-indigo-400" />
                  <span className="text-gray-300">
                    {selectedMember.location}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutUs;

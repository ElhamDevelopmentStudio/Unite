"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { UserItem } from "./UserItem";
import sidebarLinks from "@/constants";
import Image from "next/image";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else if (window.innerWidth < 768) {
        setIsMobile(false);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (isMobile) return null;

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <motion.nav
        initial={{ x: -250 }}
        animate={{
          x: 0,
          width: isCollapsed ? 80 : 250,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        }}
        className={`sticky left-0 top-0 h-screen bg-gradient-to-b text-white shadow-xl z-50
                    ${isCollapsed ? "w-20" : "w-64"}
                    hidden sm:block`}
      >
        <motion.div
          className={`absolute top-4 right-4 cursor-pointer text-white ${
            isCollapsed ? "right-[10px] top-[85px] pr-4" : "mt-20"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
        </motion.div>

        <div className="flex flex-col h-full p-4 pt-28 ">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold mb-8 text-center"
              />
            )}
          </AnimatePresence>

          {sidebarLinks.map((link) => {
            const isActive = pathName === link.route;
            return (
              <Link href={link.route} key={link.label}>
                <motion.div
                  className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer ${
                    isActive
                      ? "bg-indigo-600"
                      : "hover:bg-white hover:bg-opacity-10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={link.imgUrl}
                      alt="logo"
                      width={30}
                      height={30}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-4"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}

          <div className="mt-auto">
            <UserItem />
          </div>
        </div>
      </motion.nav>
    </IconContext.Provider>
  );
};

export default Sidebar;
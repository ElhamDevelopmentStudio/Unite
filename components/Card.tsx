import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  bgColor,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 h-full flex flex-col justify-between ">
        <div className="mb-4">
          <motion.div
            className={`text-4xl pb-10`}
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
          >
            <Image src={icon} alt={title} width={27} height={27} />
          </motion.div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
      <motion.div
        className={`absolute top-0 right-0 w-20 h-20 ${bgColor} opacity-10 rounded-full`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Card;

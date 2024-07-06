"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Link as LinkIcon,
  Copy,
  Edit,
} from "lucide-react";
import { useToast } from "./ui/use-toast";
import EditMeeting from "./EditMeeting";

interface Meeting {
  title: string;
  description: string;
  dateTime: string;
}

interface MeetingCardProps {
  title: string;
  date: string;
  time: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  attendees: { name: string; avatar: string }[];
  description: string; // Add description to the props
  onUpdateMeeting: (updatedMeeting: Meeting) => void; // Add this prop
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  icon,
  title,
  date,
  time,
  isPreviousMeeting,
  handleClick,
  link,
  buttonText,
  attendees = [],
  description,
  onUpdateMeeting,
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Meeting link has been copied to clipboard",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedMeeting: Meeting) => {
    onUpdateMeeting(updatedMeeting);
    setIsEditing(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Image
              src={icon}
              alt="meeting type"
              width={32}
              height={32}
              className="mr-3"
            />
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          <div className="flex flex-col space-y-2 mb-4">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span>{time}</span>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <Users className="w-5 h-5 mr-2 text-blue-400" />
            <div className="flex -space-x-2 overflow-hidden">
              {attendees.slice(0, 3).map((attendee, index) => (
                <Image
                  key={index}
                  src={attendee.avatar}
                  alt={attendee.name}
                  width={32}
                  height={32}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                />
              ))}
              {attendees.length > 3 && (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-xs font-medium text-white ring-2 ring-white">
                  +{attendees.length - 3}
                </span>
              )}
            </div>
          </div>
          {!isPreviousMeeting && (
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 transition duration-300"
              >
                {buttonText || "Join Meeting"}
              </motion.button>
            </div>
          )}
        </div>
        {!isPreviousMeeting && (
          <div className="bg-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <LinkIcon className="w-4 h-4 mr-2" />
              <span className="text-sm truncate max-w-[200px]">{link}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              className="text-blue-400 hover:text-blue-300 transition duration-300"
            >
              Copy
            </motion.button>
          </div>
        )}
      </motion.div>
      {isEditing && (
        <EditMeeting
          meeting={{
            title,
            description,
            dateTime: `${date}T${time}`,
          }}
          onSave={handleSave}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
};

export default MeetingCard;
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaUserFriends } from "react-icons/fa";
import useNearestUpcomingCall from "@/hooks/useNearestUpcomingCall";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { nearestUpcomingCall, isLoading } = useNearestUpcomingCall();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formattedTime = nearestUpcomingCall?.state.startsAt
    ? new Date(nearestUpcomingCall.state.startsAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaClock className="text-6xl text-purple-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="  bg-gradient-to-br from-blue-500/20 to-blue-40 p-8">
      <>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-purple-100 p-6 shadow-md">
            <h2 className="mb-4 flex items-center text-2xl font-semibold text-purple-800">
              <FaClock className="mr-2" /> Current Time
            </h2>
            <p className="text-3xl font-bold text-purple-600">
              {formatTime(currentTime)}
            </p>
            <p className="mt-2 text-lg text-purple-600">
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="rounded-lg bg-indigo-100 p-6 shadow-md">
            <h2 className="mb-4 flex items-center text-2xl font-semibold text-indigo-800">
              <FaCalendar className="mr-2" /> Next Meeting
            </h2>
            {nearestUpcomingCall ? (
              <>
                <p className="text-3xl font-bold text-indigo-600">
                  {formattedTime}
                </p>
              </>
            ) : (
              <p className="text-xl text-indigo-600">No upcoming meetings</p>
            )}
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-gray-100 p-6 shadow-md ">
          <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800">
            <FaUserFriends className="mr-2" /> Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <MeetingTypeList />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
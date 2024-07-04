"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";
import useNearestUpcomingCall from "@/hooks/useNearestUpcomingCall";

const Home = () => {
  const now = new Date();
  const { nearestUpcomingCall, isLoading } = useNearestUpcomingCall();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedTime = nearestUpcomingCall?.state.startsAt
    ? new Date(nearestUpcomingCall.state.startsAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const formattedDate = nearestUpcomingCall?.state.startsAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
        new Date(nearestUpcomingCall.state.startsAt)
      )
    : "";

  return (
    <section className="flex size-full flex-col gap-10 text-white ">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded-lg py-2 text-center text-base font-normal">
            Upcoming Meeting at: {formattedTime}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;

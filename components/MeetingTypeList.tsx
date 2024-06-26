"use client";
import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const router = useRouter();

  const createMeeting = async () => {};

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="New Meeting"
        icon="/icons/add-meeting.svg"
        description="Start an instant meeting"
        bgColor="bg-orange-1"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <Card
        title="Join Meeting"
        icon="/icons/join-meeting.svg"
        description="Via invitation Link"
        bgColor="bg-blue-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <Card
        title="Schedule Meeting"
        icon="/icons/schedule.svg"
        description="Plan your meeting"
        bgColor="bg-purple-1"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <Card
        title="View Recordings"
        icon="/icons/recordings.svg"
        description="Watch all the recorded meetings"
        bgColor="bg-yellow-500"
        onClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start an instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;

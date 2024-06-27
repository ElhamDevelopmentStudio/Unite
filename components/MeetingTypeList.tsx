"use client";
import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { StreamChat } from "stream-chat";
import { tokenProvider } from "@/Actions/stream.actions";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    Description: "",
    link: "",
  });
  const { toast } = useToast();

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Failed to create meeting",
        });
      }
      const id = crypto.randomUUID();

      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call.");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.Description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      // Create a chat channel with the same ID as the call
      const chatClient = StreamChat.getInstance(apiKey!);
      const token = await tokenProvider();
      await chatClient.connectUser(
        {
          id: user?.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        token
      );

      const channel = chatClient.channel("messaging", id, {
        name: `Meeting Chat: ${id}`,
        members: [user.id],
      });

      await channel.watch();

      setCallDetails(call);

      if (!values.Description) {
        router.push(`/meeting/${call.id}`);
        toast({
          title: "Meeting Created",
        });
      }
    } catch (error) {
      console.log("[MEETING_CALL]", error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

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

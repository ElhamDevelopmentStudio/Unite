"use client";
import React, { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { StreamChat } from "stream-chat";
import { tokenProvider } from "@/Actions/stream.actions";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
    description: "",
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

      const description = values.description || "Instant Meeting";

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

      if (!values.description) {
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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <Card
        title="Schedule Meeting"
        icon="/icons/schedule.svg"
        description="Plan your meeting"
        bgColor="bg-purple-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <Card
        title="View Recordings"
        icon="/icons/recordings.svg"
        description="View Recorded Meetings"
        bgColor="bg-yellow-500"
        onClick={() => router.push("/recordings")}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            ></Textarea>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            {" "}
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                setValues({ ...values, dateTime: date! });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          className="text-center"
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting Link Copied.",
            });
          }}
          img="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        className="text-center"
        title="Start an instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        className="text-center"
        title="Type the link here"
        buttonText="Join Meeting"
        handleClick={() => {
          router.push(values.link);
        }}
      >
        <Input
          placeholder="Meeting Link"
          className=" border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setValues({ ...values, link: e.target.value });
          }}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;

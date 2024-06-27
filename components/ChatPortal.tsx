"use client";
import React, { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/Actions/stream.actions";
import Loader from "./Loader";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const ChatPortal = ({ channelId }: { channelId: string }) => {
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const chatUser = {
    id: user?.id || "user ID",
    name: user?.username || user?.id,
    image: user?.imageUrl,
  };

  useEffect(() => {
    if (!isLoaded || !user || !channelId) return;
    if (!apiKey) throw new Error("Stream api key missing");
    if (!chatUser.id) throw new Error("chat ID is missing");

    const chatClientProvider = async () => {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(chatUser, tokenProvider);

      const channel = chatClient.channel("messaging", channelId, {
        members: [chatUser.id],
      });

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    };

    chatClientProvider(); //eslint-disable-next-line
  }, [user, isLoaded, channelId]);

  if (!channel || !client) return <Loader />;

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatPortal;

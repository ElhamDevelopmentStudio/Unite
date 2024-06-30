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
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/Actions/stream.actions";
import Loader from "./Loader";
import { EmojiPicker } from "stream-chat-react/emojis";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

const ChatPortal: React.FC<{ channelId: string }> = ({ channelId }) => {
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const initChat = async () => {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(
        {
          id: user?.id,
          name: user?.fullName || "User Name",
        },
        tokenProvider
      );

      const chatChannel = chatClient.channel("messaging", channelId, {
        name: "General",
      });

      await chatChannel.watch();

      setClient(chatClient);
      setChannel(chatChannel);
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [isLoaded, user, channelId]);

  const updateChannelType = async () => {
    const response = await fetch("/api/updateChannelType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelType: "messaging",
        grants: {
          channel_member: [
            "read-channel",
            "create-message",
            "update-message-owner",
            "delete-message-owner",
          ],
        },
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Channel type updated successfully", data);
    } else {
      console.error("Failed to update channel type", data.error);
    }
  };

  if (!client || !channel) return <Loader />;

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel} EmojiPicker={EmojiPicker}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
      <button onClick={updateChannelType}>Update Channel Type</button>
    </Chat>
  );
};

export default ChatPortal;

import { StreamChat } from "stream-chat";
import { NextResponse, NextRequest } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_API_SECRET as string;

interface UpdateChannelTypeRequest {
  channelType: string;
  grants: Record<string, string[]>;
}

export async function POST(request: NextRequest) {
  const { channelType, grants }: UpdateChannelTypeRequest =
    await request.json();

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);

  try {
    await serverClient.updateChannelType(channelType, {
      grants,
    });
    return NextResponse.json({ message: "Channel type updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

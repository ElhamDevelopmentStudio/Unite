import StreamVideoProvider from "@/providers/StreamClientProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default RootLayout;

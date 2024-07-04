"use client";
import { useEffect, useState } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/video-react-sdk";

const useNearestUpcomingCall = () => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const [nearestUpcomingCall, setNearestUpcomingCall] = useState<Call | null>(
    null
  );

  useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      const now = new Date();
      let nearestCall = upcomingCalls[0]; // Initialize with the first call

      for (const call of upcomingCalls) {
        // Check if call.state.startsAt exists and is a Date object
        if (
          call.state.startsAt &&
          Object.prototype.toString.call(call.state.startsAt) ===
            "[object Date]"
        ) {
          const callStartTime = new Date(call.state.startsAt);
          if (
            callStartTime > now &&
            callStartTime < new Date(nearestCall.state.startsAt || now)
          ) {
            nearestCall = call;
          }
        }
      }

      setNearestUpcomingCall(nearestCall);
    }
  }, [upcomingCalls]);

  return { nearestUpcomingCall, isLoading };
};

export default useNearestUpcomingCall;

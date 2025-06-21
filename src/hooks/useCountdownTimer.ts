import { useState, useEffect, useCallback } from "react";

const useCountdownTimer = (initialTime: number) => {
  // Get initial time from localStorage or use provided initial time
  const getInitialTime = useCallback(() => {
    // Handle server-side rendering
    if (typeof window === "undefined") return initialTime;

    const savedEndTime = localStorage.getItem("countdownEndTime");

    if (!savedEndTime) return initialTime;

    try {
      const endTime = parseInt(savedEndTime, 10);
      if (isNaN(endTime)) return initialTime;

      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

      // If timer expired in storage, return 0 instead of initial time
      return remaining === 0 ? 0 : Math.min(remaining, initialTime);
    } catch (error) {
      console.error("Error parsing saved timer data:", error);
      return initialTime;
    }
  }, [initialTime]);

  const [timeLeft, setTimeLeft] = useState<number>(getInitialTime);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Format seconds to HH:MM:SS
  const formatTime = useCallback((seconds: number): string => {
    if (seconds <= 0) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  }, []);

  // Start/pause toggle
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(true);
    setTimeLeft(initialTime);
    localStorage.removeItem("countdownEndTime");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      // Calculate and save end time
      const endTime = Date.now() + timeLeft * 1000;
      localStorage.setItem("countdownEndTime", endTime.toString());

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            if (interval) clearInterval(interval);
            localStorage.removeItem("countdownEndTime");
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      localStorage.removeItem("countdownEndTime");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isActive,
    toggleTimer,
    resetTimer,
  };
};

export default useCountdownTimer;

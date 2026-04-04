"use client";

import { useEffect, useState, useRef } from "react";

export function useProctoringSession(problemId: string) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [warningCount, setWarningCount] = useState(0);
  const [isTabFocused, setIsTabFocused] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 1. Request Camera and Mic
    async function startMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
      } catch (err) {
        setError("Camera and Microphone access required for high-value problems.");
        console.error("Media Error:", err);
      }
    }

    if (!stream) {
      startMedia();
    }

    // 3. Tab/Window Focus & Screenshot Detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabFocused(false);
        setWarningCount((prev) => {
          const next = prev + 1;
          alert("⚠️ Tab switched! This is being monitored.");
          return next;
        });
      } else {
        setIsTabFocused(true);
      }
    };

    const handleBlur = () => {
      setIsTabFocused(false);
      setWarningCount((prev) => prev + 1);
    };

    const handleFocus = () => {
      setIsTabFocused(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
       // Detect PrintScreen and common screenshot combos
       if (e.key === "PrintScreen" || (e.shiftKey && e.metaKey && e.key === "s")) {
          e.preventDefault();
          setWarningCount((prev) => prev + 1);
          alert("⚠️ SCREENSHOT ATTEMPT DETECTED! Screen capture is strictly prohibited during mining sessions.");
       }
    };

    const handleContextMenu = (e: MouseEvent) => {
       e.preventDefault();
       console.warn("[PROCTOR] Right-click attempt blocked.");
    };

    const handleCopyPaste = (e: Event) => {
       e.preventDefault();
       alert("⚠️ COPY/PASTE IS DISABLED: This action has been logged as a proctoring violation.");
       console.warn(`[PROCTOR] ${e.type} attempt detected.`);
       setWarningCount((prev) => prev + 1);
    };

    const handleSelect = (e: Event) => {
       e.preventDefault();
    };

    const handleResize = () => {
       alert("⚠️ WINDOW RESIZE DETECTED: This action has been logged as a proctoring violation. Terminal will close after 3 attempts.");
       setWarningCount((prev) => prev + 1);
       console.warn("[PROCTOR] Window resize attempt detected.");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("selectstart", handleSelect);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("selectstart", handleSelect);
    };
  }, []);

  useEffect(() => {
    if (!stream) return;

    let motionInterval: NodeJS.Timeout;
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let scriptProcessor: ScriptProcessorNode;

    const startMicMonitoring = (mStream: MediaStream) => {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(mStream);
      scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i];
        }
        const average = values / length;
        
        if (average > 65) { 
          setWarningCount((prev) => prev + 1);
          analyser.disconnect(scriptProcessor);
          setTimeout(() => {
             if (analyser && scriptProcessor) analyser.connect(scriptProcessor);
          }, 3000); 
        }
      };
    };

    const startMotionDetection = (mStream: MediaStream) => {
      const video = document.createElement("video");
      video.srcObject = mStream;
      video.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let prevFrame: ImageData | null = null;

      motionInterval = setInterval(() => {
        if (!ctx) return;
        if (video.videoWidth === 0) return;

        canvas.width = 160; 
        canvas.height = 120;
        ctx.drawImage(video, 0, 0, 160, 120);
        const currentFrame = ctx.getImageData(0, 0, 160, 120);

        if (prevFrame) {
          let diff = 0;
          const data1 = prevFrame.data;
          const data2 = currentFrame.data;

          for (let i = 0; i < data1.length; i += 4) {
            const rDiff = Math.abs(data1[i] - data2[i]);
            const gDiff = Math.abs(data1[i+1] - data2[i+1]);
            const bDiff = Math.abs(data1[i+2] - data2[i+2]);
            
            if (rDiff + gDiff + bDiff > 100) { 
              diff++;
            }
          }

          const moveRatio = diff / (160 * 120);
          
          if (moveRatio > 0.40) {
            setWarningCount((prev) => prev + 1);
            clearInterval(motionInterval);
            setTimeout(() => startMotionDetection(mStream), 5000);
          }
        }
        prevFrame = currentFrame;
      }, 1500); 
    };

    startMicMonitoring(stream);
    startMotionDetection(stream);

    return () => {
      if (motionInterval) clearInterval(motionInterval);
      if (audioContext) audioContext.close();
      stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);


  // 4. WebSocket Streaming (mock)
  useEffect(() => {
    if (stream) {
      // In a real app, you'd connect to process.env.NEXT_PUBLIC_WS_URL
      // const socket = new WebSocket(`wss://api.mindledger.xyz/proctor/${problemId}`);
      // socketRef.current = socket;
      
      const interval = setInterval(() => {
        // Send frame/status to backend
        // console.log("Streaming frame to backend...");
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [stream, problemId]);

  return {
    stream,
    warningCount,
    isTabFocused,
    isScreenSharing,
    error,
    disqualified: warningCount >= 3,
  };
}

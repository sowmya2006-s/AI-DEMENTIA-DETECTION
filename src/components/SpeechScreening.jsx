import React, { useState, useEffect } from "react";

const audioOnly = [
  "/audio/a1.mp3",
  "/audio/a2.mp3",
  "/audio/a3.mp3",
];

const pictureAudio = [
  { img: "/img/p1.jpg", audio: "/audio/p1.mp3" },
  { img: "/img/p2.jpg", audio: "/audio/p2.mp3" },
  { img: "/img/p3.jpg", audio: "/audio/p3.mp3" },
];

export default function SpeechScreening({ onComplete }) {
  const [round, setRound] = useState(0);
  const [stage, setStage] = useState("audioOnly");
  const [breakSeconds, setBreakSeconds] = useState(30);

  useEffect(() => {
    let timer;
    if (stage === "break" || stage === "pictureBreak") {
      timer = setInterval(() => {
        setBreakSeconds((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            if (stage === "break") setStage("pictureAudio");
            else if (stage === "pictureBreak") {
              if (round < 2) {
                setRound(round + 1);
                setStage("audioOnly");
              } else {
                onComplete();
              }
            }
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, round]);

  return (
    <div>
      {stage === "audioOnly" && (
        <>
          <h2>Phase 1: Listen</h2>
          <audio controls src={audioOnly[round]} />
          <br /><br />
          <button onClick={() => setStage("break")}>Done</button>
        </>
      )}

      {(stage === "break" || stage === "pictureBreak") && (
        <h2>Break: {breakSeconds} sec</h2>
      )}

      {stage === "pictureAudio" && (
        <>
          <h2>Phase 2: Look & Listen</h2>
          <img src={pictureAudio[round].img} alt="" width="200" />
          <br /><br />
          <audio controls src={pictureAudio[round].audio} />
          <br /><br />
          <button onClick={() => setStage("pictureBreak")}>Done</button>
        </>
      )}
    </div>
  );
}

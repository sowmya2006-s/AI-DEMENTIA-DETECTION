import React, { useState } from "react";
import SpeechScreening from "./components/SpeechScreening.jsx";
import Results from "./components/Results.jsx";

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      {step === 1 && (
        <div>
          <h1>Start Speech Assessment</h1>
          <button onClick={() => setStep(2)}>Start</button>
        </div>
      )}
      {step === 2 && <SpeechScreening onComplete={() => setStep(3)} />}
      {step === 3 && <Results />}
    </div>
  );
}

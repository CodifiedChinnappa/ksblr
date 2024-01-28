import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 60000);
  }, []);

  return <div>{confetti && <Confetti />}</div>;
};

export default ConfettiComponent;

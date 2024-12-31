"use client"; // Enables client-side rendering for this component

import React, { useState, useEffect } from "react";
import styles from "./styles/calculator.module.css"; // Adjust the path to your CSS file if needed

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setError(false);
    } else if (value === "=") {
      try {
        const result = eval(input); // Avoid using eval in production apps
        if (isNaN(result) || !isFinite(result)) {
          throw new Error("Invalid Calculation");
        }
        setInput(result.toString());
        setError(false);
      } catch {
        setInput("Error");
        setError(true);
      }
    } else {
      if (error) {
        setInput(value);
        setError(false);
      } else {
        setInput((prev) => prev + value);
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (!isNaN(Number(key)) || ["+", "-", "*", "/"].includes(key)) {
      handleButtonClick(key);
    } else if (key === "Enter") {
      handleButtonClick("=");
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key.toLowerCase() === "c") {
      handleButtonClick("C");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${error ? styles.error : ""}`}>
        {input || "0"}
      </div>
      <div className={styles.buttons}>
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
          <button
            key={btn}
            className={styles.button}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Calculator />
    </main>
  );
}

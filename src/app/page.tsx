"use client";

import React, { useState } from "react";
import styles from "./styles/calculator.module.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const OPERATORS = ["+", "-", "*", "/"];


  const tokenize = (expression: string): (string | number)[] => {
    const tokens: (string | number)[] = [];
    let numberBuffer = "";

    for (let char of expression) {
      if (!isNaN(Number(char)) || char === ".") {
        numberBuffer += char; 
      } else if (OPERATORS.includes(char)) {
        if (numberBuffer) {
          tokens.push(parseFloat(numberBuffer));
          numberBuffer = "";
        }
        tokens.push(char); 
      }
    }

    if (numberBuffer) {
      tokens.push(parseFloat(numberBuffer));
    }

    return tokens;
  };


  const evaluateTokens = (tokens: (string | number)[]): number => {
    const stack: number[] = [];
    let operator = "";

    for (let token of tokens) {
      if (typeof token === "number") {
        stack.push(token);
      } else if (OPERATORS.includes(token as string)) {
        operator = token as string;
      } else {
        throw new Error("Invalid token");
      }

      if (stack.length >= 2 && operator) {
        const b = stack.pop()!;
        const a = stack.pop()!; 

        switch (operator) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            if (b === 0) throw new Error("Division by zero");
            stack.push(a / b);
            break;
          default:
            throw new Error("Unknown operator");
        }

        operator = ""; // Reset operator
      }
    }

    if (stack.length !== 1) {
      throw new Error("Malformed expression");
    }

    return stack[0];
  };

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setError(false);
    } else if (value === "=") {
      try {
        const tokens = tokenize(input);
        const result = evaluateTokens(tokens);
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

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${error ? styles.error : ""}`}>
        {input || "0"}
      </div>
      <div className={styles.buttons}>
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "C",
          "0",
          ".",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            className={styles.button}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
        <button
          className={`${styles.button} ${styles.enter}`}
          onClick={() => handleButtonClick("=")}
        >
          Enter
        </button>
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
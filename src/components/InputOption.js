import React from "react";
import "./InputOption.css";

function InputOption({ Image, text, color }) {
  return (
    <div className="inputOption">
      <Image style={{ color: color }} className="inputIcon" />
      <h5>{text}</h5>
    </div>
  );
}

export default InputOption;

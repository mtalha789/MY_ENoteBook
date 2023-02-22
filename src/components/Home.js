import React from "react";
import Note from "./Note";

export default function Home(props) {
  return (
    <div className="container">
      <Note showalert={props.showalert} />
    </div>
  );
}

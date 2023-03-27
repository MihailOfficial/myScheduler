import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import TestNotes from "./pages/TestNotes";
import Login from "./Login";
import TaskList from "./TaskList";

function App() {
  //gets all the notes from the database and updates the notes hook on start
  useEffect(() => {}, []);

  //notes is a list of note components
  return (
    <div>
      <TaskList />
    </div>
  );
}
export default App;

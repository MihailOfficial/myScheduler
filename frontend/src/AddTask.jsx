import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function AddTask(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [type, setType] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  function openModal() {
    fetchTasks();
    setModalIsOpen(true);
  }

  async function fetchTasks() {
    // Fetch tasks from the database here.
    // Replace the URL with the actual API endpoint.

    const token = localStorage.getItem("token");
    const response = await axios.get(`/api/task/getAll/${token}`);

    if (Array.isArray(response.data.tasks)) {
      setTasks(response.data.tasks);
    } else {
      console.error("Invalid response data:", response.data);
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleTaskTextChange(e) {
    setTaskText(e.target.value);
  }

  function handleTaskStartChange(e) {
    setTaskStart(e.target.value);
  }

  function handleTaskEndChange(e) {
    setTaskEnd(e.target.value);
  }

  function handleTaskDescriptionChange(e) {
    setTaskDescription(e.target.value);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function handleTaskSelectChange(e) {
    setSelectedTask(e.target.value);
    const selectedTask = tasks.find((task) => task.name === e.target.value);
    if (selectedTask) {
      setTaskDescription(selectedTask.description);
    } else {
      setTaskDescription("");
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const offsetInMilliseconds = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const adjustedStart = new Date(
      new Date(taskStart).getTime() - offsetInMilliseconds
    );
    const adjustedEnd = new Date(
      new Date(taskEnd).getTime() - offsetInMilliseconds
    );
    const duration = adjustedEnd.getTime() - adjustedStart.getTime();

    let taskId = "";
    if (type == "Task") {
      let task = tasks.find((task) => task.name === selectedTask);
      taskId = task.taskId;
    }

    const adjustedStartFormatted = adjustedStart.toISOString();
    // console.log("Type:", type);
    // console.log("TaskId:", taskId);
    // console.log("Duration:", duration);
    // console.log("name:", taskText);
    // console.log("description:", taskDescription);
    // console.log("Adjusted Start Formatted:", adjustedStartFormatted);

    const newBlock = {
      name: taskText,
      start: adjustedStartFormatted,
      description: taskDescription,
      duration: duration,
      taskid: taskId,
      id: Date.now(),
    };
    props.onSubmit(newBlock);
    setModalIsOpen(false);
    setTaskStart("");
    setTaskEnd("");
    setTaskText("");
    setTaskDescription("");
    setType("");
    setSelectedTask("");
  }

  return (
    <>
      <button onClick={openModal}>Add Blocker</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Task Modal"
      >
        <h2>Add a New Blocker/Schedule</h2>
        <form onSubmit={handleFormSubmit}>
          <br />
          <label>
            Task Name:
            <input
              type="text"
              value={taskText}
              onChange={handleTaskTextChange}
            />
          </label>
          <br />
          <br />
          <label>
            Type:
            <select value={type} onChange={handleTypeChange}>
              <option value="">-- Select Type --</option>
              <option value="Blcoker">blocker</option>
              <option value="Task">task</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Select Task:
            <select value={selectedTask} onChange={handleTaskSelectChange}>
              <option value="">-- Select Task --</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.name}>
                  {task.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            Start Time:
            <input
              type="datetime-local"
              value={taskStart}
              onChange={handleTaskStartChange}
            />
          </label>
          <br />
          <label>
            End Time:
            <input
              type="datetime-local"
              value={taskEnd}
              onChange={handleTaskEndChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
            ></textarea>
          </label>
          <br />
          <br />
          <button type="submit">Add</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </>
  );
}

export default AddTask;

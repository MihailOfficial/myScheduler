import React, { useState } from "react";
import Modal from "react-modal";

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
  const [taskText, setTaskText] = useState("");
  const [taskStart, setTaskStart] = useState("");
  const [taskEnd, setTaskEnd] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  function openModal() {
    setModalIsOpen(true);
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

  function handleTaskCategoryChange(e) {
    setTaskCategory(e.target.value);
  }

  function handleTaskPriorityChange(e) {
    setTaskPriority(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newTask = {
      text: taskText,
      start: taskStart,
      end: taskEnd,
      description: taskDescription,
      category: taskCategory,
      priority: taskPriority,
      id: Date.now(),
    };
    props.onSubmit(newTask);
    setModalIsOpen(false);
    setTaskText("");
    setTaskStart("");
    setTaskEnd("");
    setTaskDescription("");
    setTaskCategory("");
    setTaskPriority("");
  }


  return (
    <>
      <button onClick={openModal}>Add Task</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Task Modal"
      >
        <h2>Add a New Task</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={taskText}
              onChange={handleTaskTextChange}
            />
          </label>
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
          <label>
            Category:
            <input
              type="text"
              value={taskCategory}
              onChange={handleTaskCategoryChange}
            />
          </label>
          <br />
          <label>
            Priority:
            <select value={taskPriority} onChange={handleTaskPriorityChange}>
              <option value="">-- Select Priority --</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
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
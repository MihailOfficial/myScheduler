import React from "react";

function TaskTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
import React, { Component } from "react";
import Modal from "react-modal";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";

import TaskTable from "./TaskTable";
import AddTask from "./AddTask";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      taskName: "",
    };
    this.state = {
      isModalOpen: false,
      taskName: "",
    };
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.form({
          title: "Create a new task:",
          fields: [
            { name: "taskName", title: "Task Name", type: "text" },
            { name: "startTime", title: "Start Time", type: "time" },
            { name: "endTime", title: "End Time", type: "time" },
          ],
          focus: "taskName",
        });
        dp.clearSelection();
        if (!modal.result) {
          return;
        }

        console.log("Selected time range: ", args.start, " - ", args.end);

        const start = args.start;
        const end = args.end;
        const id = DayPilot.guid();
        const text = modal.result.taskName;

        dp.events.add({
          start,
          end,
          id,
          text,
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  handleAddTask = (task) => {
    const dp = this.calendar;
    const { text, start, end } = task;
    const id = DayPilot.guid();
    const newTask = {
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      id,
      text: text
    };
    dp.events.add(newTask);
    console.log("New task added: ", newTask);
    console.log(dp.events);
    this.setState({ isModalOpen: false });
  };

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    //need to add start and end times to appear in calendar
    // name field is "text"
    // task_id is id
    const events = [
      {
        id: 1,
        start: "2023-03-07T10:30:00",
        end: "2023-03-07T13:00:00",
        text: "ECSE 428 HW",
        description: "Complete backlog",
        user_email: "archi@mail.com",
        work_done: 3,
        length_of_work: 10,
        category: "Homework",
        priority: "high",
      },
    ];

    const startDate = "2023-03-07";

    this.calendar.update({ startDate, events });
  }

  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            skipMonths={1}
            startDate={"2023-03-07"}
            selectionDay={"2023-03-07"}
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar {...this.state} ref={this.calendarRef} />
          <AddTask onSubmit={this.handleAddTask} />
        </div>
      </div>
    );
  }
}

export default Calendar;

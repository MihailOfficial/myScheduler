import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";

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
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new task:",
          "Task 1"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
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
      {
        id: 2,
        start: "2023-03-07T12:00:00",
        end: "2023-03-07T15:00:00",
        text: "ECSE 427 HW",
        description: "Project 1",
        user_email: "betty@mail.com",
        work_done: 5,
        length_of_work: 10,
        category: "Homework",
        priority: "low",
      },
      {
        id: 3,
        start: "2023-03-08T15:00:00",
        end: "2023-03-08T18:00:00",
        text: "ECSE 429 HW",
        description: "Deliverable 1",
        user_email: "juf@mail.com",
        work_done: 8,
        length_of_work: 15,
        category: "Homework",
        priority: "high",
      },
      {
        id: 4,
        start: "2023-03-09T10:00:00",
        end: "2023-03-09T12:00:00",
        text: "ECSE 321 HW",
        description: "Deliverable 2",
        user_email: "matt@mail.com",
        work_done: 6,
        length_of_work: 9,
        category: "Homework",
        priority: "mid",
      },
      {
        id: 5,
        start: "2023-03-09T12:00:00",
        end: "2023-03-09T15:00:00",
        text: "ECSE 223 HW",
        description: "Assignment 1",
        user_email: "reg@mail.com",
        work_done: 2,
        length_of_work: 10,
        category: "Homework",
        priority: "high",
      },
      {
        id: 6,
        start: "2023-03-10T10:00:00",
        end: "2023-03-10T12:00:00",
        text: "ECSE 316 HW",
        description: "Assignment 1",
        user_email: "matt@mail.com",
        work_done: 1,
        length_of_work: 7,
        category: "Homework",
        priority: "low",
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
        </div>
      </div>
    );
  }
}

export default Calendar;

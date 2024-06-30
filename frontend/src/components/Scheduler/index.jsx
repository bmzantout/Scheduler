import React from 'react';
import ReactDOM from 'react-dom';
import WeeklyTable from './WeeklyTable';
// import './scheduler.css';

const Scheduler = () => {
  return (
    <div className="scheduler-container">
      <h1>Weekly Scheduler</h1>
      <WeeklyTable />
    </div>
  );
};

ReactDOM.render(<Scheduler />, document.getElementById('root'));

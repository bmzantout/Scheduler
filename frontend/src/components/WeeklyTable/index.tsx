import React, { useState } from 'react';
import './WeeklyTable.css';

const WeeklyTable = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const [events, setEvents] = useState({});

  const handleCellClick = (day, slot) => {
    const event = prompt(`Enter event for ${day} at ${slot}`);
    if (event) {
      setEvents(prevEvents => ({
        ...prevEvents,
        [`${day}-${slot}`]: event
      }));
    }
  };

  return (
    <div className="scheduler">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot}</td>
              {daysOfWeek.map(day => (
                <td
                  key={day}
                  onClick={() => handleCellClick(day, slot)}
                >
                  {events[`${day}-${slot}`]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyTable;

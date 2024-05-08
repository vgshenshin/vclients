import { Value } from "react-calendar/dist/cjs/shared/types";
import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";

import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
	const { calendarDate, setRangeCalendarDate } =
		useContext(AppointmentContext);

	return (
		<div className="calendar">
			<LibCalendar
				onChange={(value) => setRangeCalendarDate(value)}
				value={calendarDate}
				selectRange
			/>
		</div>
	);
}

export default Calendar;

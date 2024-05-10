import { Calendar as LibCalendar } from "react-calendar";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";

import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
	const { calendarDate, setRangeCalendarDate } =
		useContext(AppointmentContext);

	useEffect(() => {
		setRangeCalendarDate([null, null]);
	}, []);

	return (
		<div className="calendar">
			<LibCalendar
				onChange={(value) => setRangeCalendarDate(value)}
				value={calendarDate}
				selectRange
			/>
			<button
				disabled={
					Array.isArray(calendarDate) &&
					calendarDate[0] &&
					calendarDate[1]
						? false
						: true
				}
				className="calendar__reset"
				onClick={() => setRangeCalendarDate([null, null])}
			>
				Сбросить фильтр
			</button>
		</div>
	);
}

export default Calendar;

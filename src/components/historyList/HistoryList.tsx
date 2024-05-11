import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppointmentItem from "../appointmentItem/AppointmentItem";

function HistoryList() {
	const {
		appointmentLoadingStatus,
		allAppointment,
		calendarDate,
		getAppointments,
	} = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, [calendarDate]);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<div>
				<Error />
				<button className="schedule__reload" onClick={getAppointments}>
					Загрузить снова
				</button>
			</div>
		);
	}

	return (
		<>
			{allAppointment.length === 0 ? (
				<h2 className="no-data">Нет записей в данном диапазоне дат</h2>
			) : null}
			{allAppointment.map((item) => {
				return <AppointmentItem {...item} key={item.id} />;
			})}
		</>
	);
}

export default HistoryList;

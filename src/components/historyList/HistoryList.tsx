import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";

function HistoryList() {
	const { appointmentLoadingStatus, allAppointment, getAppointments } =
		useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getAppointments}>
					Try to reload
				</button>
			</>
		);
	}

	return (
		<>
			{allAppointment.map((item) => {
				return <AppointmentItem {...item} key={item.id} />;
			})}
		</>
	);
}

export default HistoryList;

import { useContext, useEffect } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";

import "../../pages/schedule/schedulePage.scss";

function AppointmentList() {
	const {
		appointmentLoadingStatus,
		activeAppointment,
		getActiveAppointments,
	} = useContext(AppointmentContext);
	useEffect(() => {
		getActiveAppointments();
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button
					className="schedule__reload"
					onClick={getActiveAppointments}
				>
					Try to reload
				</button>
			</>
		);
	}

	return (
		<>
			{activeAppointment.map((item) => {
				return <AppointmentItem key={item.id} {...item} />;
			})}
		</>
	);
}

export default AppointmentList;

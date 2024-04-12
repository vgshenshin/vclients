import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";

function AppointmentList() {
	const { activeAppointment, getActiveAppointments } =
		useContext(AppointmentContext);
	useEffect(() => {
		getActiveAppointments();
	}, []);
	return (
		<>
			{activeAppointment.length
				? activeAppointment.map((item) => {
						return <AppointmentItem key={item.id} {...item} />;
				  })
				: null}
		</>
	);
}

export default AppointmentList;

import { useCallback, useContext, useEffect, useState } from "react";

import CancelModal from "../modal/CancelModal";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";

import "../../pages/schedule/schedulePage.scss";

function AppointmentList() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	const {
		appointmentLoadingStatus,
		activeAppointment,
		getActiveAppointments,
	} = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
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
				return (
					<AppointmentItem
						{...item}
						key={item.id}
						openModal={handleOpenModal}
						getActiveAppointments={getActiveAppointments}
					/>
				);
			})}
			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	);
}

export default AppointmentList;

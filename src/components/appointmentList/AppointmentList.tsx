import { useCallback, useContext, useEffect, useState } from "react";

import CancelModal from "../modal/CancelModal";
import AppointmentItem from "../appointmentItem/AppointmentItem";
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
		calendarDate,
		getActiveAppointments,
	} = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, [calendarDate]);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error msg={appointmentLoadingStatus} />
				<button
					className="schedule__reload"
					onClick={getActiveAppointments}
				>
					Загрузить снова
				</button>
			</>
		);
	}

	return (
		<>
			{activeAppointment.length === 0 ? (
				<h2 className="no-data">Нет записей в данном диапазоне дат</h2>
			) : null}

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

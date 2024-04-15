import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import "./appointmentItem.scss";

const AppointmentItem = ({
	id,
	name,
	date,
	service,
	phone,
}: ActiveAppointment) => {
	const [timeLeft, changeTimeLeft] = useState<string | null>(null);
	const formatedDate = dayjs(date).format("DD/MM/YYYY HH:mm");

	useEffect(() => {
		setTime();

		function getZero(num: number) {
			return num >= 0 && num < 10 ? `0${num}` : num;
		}
		function setTime() {
			const hours = getZero(dayjs(date).diff(undefined, "h"));
			const mimutes = getZero(dayjs(date).diff(undefined, "m") % 60);
			changeTimeLeft(`${hours}:${mimutes}`);
		}
		const intervalId = setInterval(setTime, 60000);
		return () => clearInterval(intervalId);
	}, [date]);

	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formatedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			<div className="appointment__time">
				<span>Time left:</span>
				<span className="appointment__timer">{timeLeft}</span>
			</div>
			<button className="appointment__cancel">Cancel</button>
			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
};

export default AppointmentItem;

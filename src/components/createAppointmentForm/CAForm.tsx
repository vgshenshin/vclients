import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

import "./caform.scss";

function CAForm() {
	const { createNewAppointment } = useAppointmentService();

	const { getActiveAppointments } = useContext(AppointmentContext);

	const [formData, setFormData] = useState<IAppointment>({
		id: 1,
		date: "",
		name: "",
		service: "",
		phone: "",
		canceled: false,
	});

	const [creationStatus, setCreationStatus] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreationStatus(true);

		createNewAppointment(formData)
			.then(() => {
				setCreationStatus(false);
				setFormData({
					id: 1,
					date: "",
					name: "",
					service: "",
					phone: "",
					canceled: false,
				});
				getActiveAppointments();
			})
			.catch(() => {
				alert("Error while creating new appointment");
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Создать новую встречу</div>
			<label htmlFor="name">
				Имя<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Имя клиента"
				required
				value={formData.name}
				onChange={handleChange}
			/>

			<label htmlFor="service">
				Услуга<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Наименование услуги"
				required
				value={formData.service}
				onChange={handleChange}
			/>

			<label htmlFor="phone">
				Номер телефона<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+7 123 456 78 90"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
				title="Введите данные в указанном формате +7 123 456 78 90"
				required
				value={formData.phone}
				onChange={handleChange}
			/>

			<label htmlFor="date">
				Дата<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="ДД/ММ/ГГГГ ЧЧ:мм"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Введите данные в указанном формате ДД/ММ/ГГГГ ЧЧ:мм"
				required
				value={formData.date}
				onChange={handleChange}
			/>
			<button disabled={creationStatus}>Создать</button>
		</form>
	);
}

export default CAForm;

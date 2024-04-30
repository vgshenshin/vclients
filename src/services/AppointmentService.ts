import dayjs from "dayjs";

import { useHttp } from "../hooks/http.hook";
import hasRequaredFields from "../utils/hasRequaredFields";
import {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

const requaredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
	const { loadingStatus, request } = useHttp();

	const _apiBase = "http://localhost:3001/appointments";

	const getAllAppointments = async (): Promise<IAppointment[]> => {
		const res = await request({ url: _apiBase });
		if (
			res.every((item: IAppointment) =>
				hasRequaredFields(item, requaredFields)
			)
		) {
			return res;
		} else {
			throw new Error(`Data doesn't have all the fields`);
		}
	};

	const getAllActiveAppointments = async (): Promise<ActiveAppointment[]> => {
		const base = await getAllAppointments();

		const transformed: ActiveAppointment[] = base
			.filter(
				(item) =>
					!item.canceled && dayjs(item.date).diff(undefined, "m") > 0
			)
			.map(({ id, date, name, service, phone }) => ({
				id,
				date,
				name,
				service,
				phone,
			}));

		return transformed;
	};

	const cancelOneAppointment = async (id: number) => {
		return await request({
			url: `${_apiBase}/${id}`,
			method: "PATCH",
			body: JSON.stringify({
				canceled: true,
			}),
		});
	};

	return {
		loadingStatus,
		getAllAppointments,
		getAllActiveAppointments,
		cancelOneAppointment,
	};
};

export default useAppointmentService;

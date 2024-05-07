import {
	IAppointment,
	ActiveAppointment,
} from "../shared/interfaces/appointment.interface";

import { useHttp } from "../hooks/http.hook";
import hasRequaredFields from "../utils/hasRequaredFields";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
			return res.sort(
				(a: IAppointment, b: IAppointment) =>
					new Date(a.date).getTime() - new Date(b.date).getTime()
			);
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

	const createNewAppointment = async (body: IAppointment) => {
		const id = new Date().getTime();
		body["id"] = id;
		body["date"] = dayjs(body.date, "DD/MM/YYYY HH:mm").format(
			"YYYY-MM-DDTHH:mm"
		);

		return await request({
			url: _apiBase,
			method: "POST",
			body: JSON.stringify(body),
		});
	};

	return {
		loadingStatus,
		getAllAppointments,
		getAllActiveAppointments,
		cancelOneAppointment,
		createNewAppointment,
	};
};

export default useAppointmentService;

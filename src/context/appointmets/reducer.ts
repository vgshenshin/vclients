import { AppointmentAction, ActionsTypes } from "./actions";

import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

import { LoadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
	allAppointment: IAppointment[] | [];
	activeAppointment: ActiveAppointment[] | [];
	appointmentLoadingStatus: LoadingStatusOptions;
}

export default function reducer(
	state: IAppointmentState,
	action: AppointmentAction
): IAppointmentState {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return {
				...state,
				allAppointment: action.payload,
				appointmentLoadingStatus: "idle",
			};
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return {
				...state,
				activeAppointment: action.payload,
				appointmentLoadingStatus: "idle",
			};
		case ActionsTypes.FETCHING_APPOINTMENTS:
			return {
				...state,
				appointmentLoadingStatus: "loading",
			};
		case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
			return {
				...state,
				appointmentLoadingStatus: "error",
			};
		default:
			return state;
	}
}

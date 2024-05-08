import { AppointmentAction, ActionsTypes } from "./actions";

import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

import { LooseValue } from "react-calendar/dist/cjs/shared/types";

import { LoadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
	allAppointment: IAppointment[] | [];
	activeAppointment: ActiveAppointment[] | [];
	calendarDate: LooseValue;
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
		case ActionsTypes.SET_CALENDARE_DATE:
			return {
				...state,
				calendarDate: action.payload,
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

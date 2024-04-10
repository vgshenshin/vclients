import { IAppointmentAction, ActionsTypes } from "./actions";

import {
	IAppointment,
	ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";

export interface IInitialState {
	allAppointment: IAppointment[] | [];
	activeAppointment: ActiveAppointment[] | [];
}

export default function reducer(
	state: IInitialState,
	action: IAppointmentAction
) {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return {
				...state,
				allAppointment: action.payload,
			};
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return {
				...state,
				activeAppointment: action.payload,
			};
		default:
			return state;
	}
}

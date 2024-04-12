import React, { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";

const initialState: IInitialState = {
	allAppointment: [],
	activeAppointment: [],
};

interface ProviderProps {
	children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointment: initialState.allAppointment,
	activeAppointment: initialState.activeAppointment,
	getAppointments: () => {},
	getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointment: state.allAppointment,
		activeAppointment: state.activeAppointment,
		getAppointments: () => {
			getAllAppointments().then((data) =>
				dispatch({
					type: ActionsTypes.SET_ALL_APPOINTMENTS,
					payload: data,
				})
			);
		},
		getActiveAppointments: () => {
			getAllActiveAppointments().then((data) =>
				dispatch({
					type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
					payload: data,
				})
			);
		},
	};

	return (
		<AppointmentContext.Provider value={value}>
			{children}
		</AppointmentContext.Provider>
	);
};

export default AppointmentContextProvider;

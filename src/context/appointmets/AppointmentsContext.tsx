import { Value } from "react-calendar/dist/cjs/shared/types";
import React, { createContext, useReducer } from "react";
import reducer, { IAppointmentState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";

const initialState: IAppointmentState = {
	allAppointment: [],
	activeAppointment: [],
	calendarDate: [null, null],
	appointmentLoadingStatus: "idle",
};

interface ProviderProps {
	children: React.ReactNode;
}

interface AppointmentContextValue extends IAppointmentState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
	setRangeCalendarDate: (range: Value) => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointment: initialState.allAppointment,
	activeAppointment: initialState.activeAppointment,
	calendarDate: initialState.calendarDate,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	getAppointments: () => {},
	getActiveAppointments: () => {},
	setRangeCalendarDate: (range: Value) => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
		useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointment: state.allAppointment,
		activeAppointment: state.activeAppointment,
		calendarDate: state.calendarDate,
		appointmentLoadingStatus: loadingStatus,
		getAppointments: () => {
			getAllAppointments()
				.then((data) => {
					const newData = data.filter((item) => {
						if (
							Array.isArray(state.calendarDate) &&
							state.calendarDate[0] &&
							state.calendarDate[1]
						) {
							if (
								new Date(item.date).getTime() >=
									new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <=
									new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
						} else {
							return item;
						}
					});

					dispatch({
						type: ActionsTypes.SET_ALL_APPOINTMENTS,
						payload: newData,
					});
				})
				.catch(() =>
					dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS })
				);
		},
		getActiveAppointments: () => {
			getAllActiveAppointments()
				.then((data) => {
					const newData = data.filter((item) => {
						if (
							Array.isArray(state.calendarDate) &&
							state.calendarDate[0] &&
							state.calendarDate[1]
						) {
							if (
								new Date(item.date).getTime() >=
									new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <=
									new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
						} else {
							return item;
						}
					});

					dispatch({
						type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
						payload: newData,
					});
				})
				.catch(() =>
					dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS })
				);
		},
		setRangeCalendarDate: (range: Value) => {
			dispatch({
				type: ActionsTypes.SET_CALENDARE_DATE,
				payload: range,
			});
		},
	};

	return (
		<AppointmentContext.Provider value={value}>
			{children}
		</AppointmentContext.Provider>
	);
};

export default AppointmentContextProvider;

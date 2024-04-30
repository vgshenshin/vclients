import Portal from "../portal/Portal";
import { useContext, useEffect, useRef, useState } from "react";
import { AppointmentContext } from "../../context/appointmets/AppointmentsContext";
import useAppointmentService from "../../services/AppointmentService";
import { CSSTransition } from "react-transition-group";

import "./modal.scss";

interface ICancelModalProps {
	closeModal: (state: boolean) => void;
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({ closeModal, selectedId, isOpen }: ICancelModalProps) {
	const { getActiveAppointments } = useContext(AppointmentContext);
	const { cancelOneAppointment } = useAppointmentService();

	const nodeRef = useRef<HTMLDivElement>(null);

	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id)
			.then(() => {
				console.log("done");
				setCancelStatus(true);
			})
			.catch(() => {
				console.log("error");
				setCancelStatus(false);
				setBtnDisabled(false);
			});
	};

	const handleClose = () => {
		closeModal(false);
		if (cancelStatus) {
			getActiveAppointments();
		}
	};

	const handleEscapePress = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			handleClose();
		}
	};

	useEffect(() => {
		document.body.addEventListener("keydown", handleEscapePress);

		return () => {
			document.body.removeEventListener("keydown", handleEscapePress);
		};
	}, [closeModal]);

	return (
		<Portal>
			<CSSTransition
				nodeRef={nodeRef}
				in={isOpen}
				timeout={{ enter: 500, exit: 500 }}
				unmountOnExit
				classNames="modal"
			>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment №
							{selectedId}?
						</span>
						<div className="modal__btns">
							<button
								className="modal__ok"
								disabled={btnDisabled}
								onClick={() => {
									handleCancelAppointment(selectedId);
								}}
							>
								Ok
							</button>
							<button
								className="modal__close"
								onClick={() => handleClose()}
							>
								Close
							</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null
								? ""
								: cancelStatus
								? "Success"
								: "Error, please try again"}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;

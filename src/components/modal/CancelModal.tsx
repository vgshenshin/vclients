import "./modal.scss";
import Portal from "../portal/Portal";
import { CSSTransition } from "react-transition-group";

import { useEffect, useRef } from "react";

interface ICancelModalProps {
	closeModal: (state: boolean) => void;
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({ closeModal, selectedId, isOpen }: ICancelModalProps) {
	const nodeRef = useRef<HTMLDivElement>(null);

	const handleEscapePress = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			closeModal(false);
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
							<button className="modal__ok">Ok</button>
							<button
								className="modal__close"
								onClick={() => closeModal(false)}
							>
								Close
							</button>
						</div>
						<div className="modal__status">Success</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;

import { useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: ReactNode;
	wrapperId?: string;
}

function createElementWrapper(wrapperId: string) {
	const wrapperElement = document.createElement("div");
	wrapperElement.setAttribute("id", wrapperId);
	// wrapperElement.setAttribute("class", "modal");
	document.body.append(wrapperElement);
	return wrapperElement;
}

function Portal({ children, wrapperId = "portal-wrapper" }: PortalProps) {
	const [wrapper, createWrapper] = useState<HTMLElement | null>(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let created = false;

		if (!element) {
			created = true;
			element = createElementWrapper(wrapperId);
		}

		createWrapper(element);

		return () => {
			if (created) element?.remove();
		};
	}, [wrapperId]);

	if (wrapper === null) return null;

	return createPortal(children, wrapper);
}

export default Portal;

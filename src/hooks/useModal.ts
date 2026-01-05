import { useState } from 'react';

interface UseModalReturn {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
	setIsOpen: (value: boolean) => void;
}

export const useModal = (defaultOpen = false): UseModalReturn => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen((prev) => !prev);

	return {
		isOpen,
		open,
		close,
		toggle,
		setIsOpen,
	};
};

import { useState } from 'react';

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

export const useToggle = (initialValue = false): UseToggleReturn => {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = () => setValue((prev) => !prev);

	return [value, toggle, setValue];
};

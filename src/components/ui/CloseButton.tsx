import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import { closeModal } from '@/lib/redux/toggleModal/slice';

interface CloseButtonProps {
	modalType: 'isSignIn' | 'isSignUp';
	className?: string;
}

const CloseButton = ({ modalType, className = '' }: CloseButtonProps) => {
	const dispatch = useDispatch();

	return (
		<button
			type="button"
			className={`text-[35px] text-[var(--main-color)] cursor-pointer ${className}`}
			onClick={() => dispatch(closeModal(modalType))}
		>
			<IoIosCloseCircleOutline />
		</button>
	);
};

export default CloseButton;

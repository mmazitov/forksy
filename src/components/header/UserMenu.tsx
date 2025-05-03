'use client';
import { useCallback, useState } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { openModal } from '@/lib/redux/toggleModal/slice';

const UserMenu = () => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const handleClick = useCallback(() => {
		setActive(!active);
	}, [active]);

	const handleSignIn = () => {
		setActive(false);
		dispatch(openModal('isSignIn'));
	};

	const handleSignUp = () => {
		setActive(false);
		dispatch(openModal('isSignUp'));
	};

	return (
		<div className="group relative">
			<button
				className="flex items-center gap-2 cursor-pointer"
				onClick={handleClick}
			>
				<PiUserCircleLight className="!w-[32px] !h-[32px]" />
			</button>
			<div
				className={`right-0 absolute bg-[var(--white-color)] shadow-drop mt-2 border border-[var(--black-color-weak)] rounded-[var(--radius)] w-48 drop-hidden ${
					active ? 'drop-visible' : ''
				}`}
			>
				<ul className="py-1">
					<li
						className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
						onClick={handleSignIn}
					>
						Sign in
					</li>
					<li
						className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
						onClick={handleSignUp}
					>
						Sign up
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserMenu;

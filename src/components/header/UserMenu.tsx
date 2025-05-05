'use client';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { PiUserCircleLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { openModal } from '@/lib/redux/toggleModal/slice';

import profilePicPlaceholder from '../../../public/profile-pic-placeholder.png';

interface UserMenuProps {
	session: Session | null;
}
const UserMenu = ({ session }: UserMenuProps) => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const user = session?.user;
	const firstName = user?.name?.split(' ')[0] || '';

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
				{user ? (
					<div className="flex flex-col items-center">
						<Image
							src={user?.image || profilePicPlaceholder}
							alt="profile"
							width={40}
							height={40}
							className="rounded-full w-10"
						/>
						<span>{firstName}</span>
					</div>
				) : (
					<PiUserCircleLight className="!w-[32px] !h-[32px]" />
				)}
			</button>
			<div
				className={`right-0 absolute bg-[var(--white-color)] shadow-drop mt-2 border border-[var(--black-color-weak)] rounded-[var(--radius)] w-48 drop-hidden ${
					active ? 'drop-visible' : ''
				}`}
			>
				<ul className="py-1">
					{user ? (
						<>
							<li
								className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
								onClick={() => signOut({ callbackUrl: '/' })}
							>
								Sign out
							</li>
						</>
					) : (
						<>
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
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default UserMenu;

'use client';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import popupBgUrl from '../../../public/popup-bg.png';
import SignIn from '../forms/SignIn';
import SignUp from '../forms/SignUp';

const AuthModal = () => {
	const { isSignIn, isSignUp } = useSelector(
		(state: {
			persisted: { modal: { isSignIn: boolean; isSignUp: boolean } };
		}) => state.persisted.modal,
	);

	if (!isSignIn && !isSignUp) return null;

	return (
		<div className="z-50 fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
			<div className="relative bg-[var(--background)] px-[16px] py-[50px] border border-[var(--drop-border)] rounded-[var(--radius)] w-full max-w-[375px] overflow-hidden">
				<div className="z-9 absolute inset-0">
					<Image
						src={popupBgUrl}
						alt="Background"
						fill
						style={{ objectFit: 'cover', opacity: 1 }}
						priority
					/>
				</div>
				<div className="z-10 relative">
					{isSignIn && <SignIn />}
					{isSignUp && <SignUp />}
				</div>
			</div>
		</div>
	);
};

export default AuthModal;

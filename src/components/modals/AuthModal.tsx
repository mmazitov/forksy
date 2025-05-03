'use client';
import { useSelector } from 'react-redux';

import SignIn from '../forms/SignIn';
import SignUp from '../forms/SignUp';

const AuthModal = () => {
	const { isSignIn, isSignUp } = useSelector(
		(state: any) => state.persisted.modal,
	);

	if (!isSignIn && !isSignUp) return null;

	return (
		<div className="z-50 fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
			<div className="bg-[var(--background)] p-[16px] border border-[var(--black-color-weak)] rounded-[var(--radius)] w-full max-w-[375px]">
				{isSignIn && <SignIn />}
				{isSignUp && <SignUp />}
			</div>
		</div>
	);
};

export default AuthModal;

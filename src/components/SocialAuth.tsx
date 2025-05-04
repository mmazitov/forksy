import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { closeModal } from '@/lib/redux/toggleModal/slice';

import Button from './ui/Button';

const SocialAuth = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleSignIn = async () => {
		dispatch(closeModal('isSignIn'));
		dispatch(closeModal('isSignUp'));
		setIsLoading(true);

		// Don't use try/catch with redirect:true as it won't catch errors
		// since the page redirects away
		await signIn('google', {
			callbackUrl: '/',
		});
	};

	const handleFacebookSignIn = async () => {
		dispatch(closeModal('isSignIn'));
		dispatch(closeModal('isSignUp'));
		alert('Facebook authentication is not implemented yet');
	};

	return (
		<ul className="flex justify-center gap-[16px] mb-[50px]">
			<li>
				<Button
					className="flex justify-center items-center bg-[var(--grey-color)] p-0 border-[var(--grey-color)] rounded-full w-[40px] min-w-auto h-[40px]"
					onClick={handleGoogleSignIn}
					disabled={isLoading}
				>
					<FaGoogle size={18} />
				</Button>
			</li>
			<li>
				<Button
					className="flex justify-center items-center bg-[var(--grey-color)] p-0 border-[var(--grey-color)] rounded-full w-[40px] min-w-auto h-[40px]"
					onClick={handleFacebookSignIn}
				>
					<FaFacebookF size={18} />
				</Button>
			</li>
		</ul>
	);
};

export default SocialAuth;

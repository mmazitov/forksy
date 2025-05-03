import { FaFacebookF, FaGoogle } from 'react-icons/fa';

import Button from './ui/Button';

const SocialAuth = () => {
	return (
		<ul className="flex justify-center gap-[16px] mb-[50px]">
			<li>
				<Button className="flex justify-center items-center bg-[var(--grey-color)] p-0 border-[var(--grey-color)] rounded-full w-[40px] min-w-auto h-[40px]">
					<FaGoogle size={18} />
				</Button>
			</li>
			<li>
				<Button className="flex justify-center items-center bg-[var(--grey-color)] p-0 border-[var(--grey-color)] rounded-full w-[40px] min-w-auto h-[40px]">
					<FaFacebookF size={18} />
				</Button>
			</li>
		</ul>
	);
};

export default SocialAuth;

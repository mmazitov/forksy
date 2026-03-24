import { useEffect, useState } from 'react';

import { ANIMATION_DURATION } from '@/shared/constants';
import './SplashScreen.css';

interface SplashScreenProps {
	onComplete?: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
	const [isVisible, setIsVisible] = useState(true);
	const [shouldRender, setShouldRender] = useState(true);

	useEffect(() => {
		const fadeOutTimer = setTimeout(() => {
			setIsVisible(false);
		}, ANIMATION_DURATION.splash);

		const removeTimer = setTimeout(() => {
			setShouldRender(false);
			onComplete?.();
		}, ANIMATION_DURATION.splash + 1000);

		return () => {
			clearTimeout(fadeOutTimer);
			clearTimeout(removeTimer);
		};
	}, [onComplete]);

	if (!shouldRender) {
		return null;
	}

	return (
		<div
			className={`bg-background fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 outline-none ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="slice-cover-top" />
			<div className="slice-slash" />

			<div className="slice-logo">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					className="mx-auto h-40 w-40 overflow-visible drop-shadow-sm"
				>
					<path
						className="m-left-shape"
						d="M 15 80 L 15 15 L 33 15 L 48 51 L 63 15 L 70 15 L 70 40 L 53 80 L 43 80 L 33 56 L 33 80 Z"
					/>
					<path
						className="knife-shape"
						d="M 74 15 L 79 15 L 82 18 L 82 35 L 74 35 Z M 74 38 L 87 38 L 87 55 Q 87 88 74 90 Z"
					/>
				</svg>
			</div>

			<div className="slice-cover-bottom" />
		</div>
	);
};

export default SplashScreen;

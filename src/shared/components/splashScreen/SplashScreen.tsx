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
			className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-1000 dark:bg-[#1a1f2e] ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				className="mx-auto h-40 w-40 overflow-visible drop-shadow-sm"
			>
				<g transform="translate(0, -5)">
					{/* Fork Tines and Base */}
					<path 
						className="fork-draw" 
						d="M 35 25 L 35 45 C 35 55, 45 60, 50 65 C 55 60, 65 55, 65 45 L 65 25 M 50 25 L 50 55" 
						fill="none" 
						strokeWidth="6" 
						strokeLinecap="round" 
						strokeLinejoin="round" 
					/>
					{/* Fork Handle */}
					<path 
						className="fork-draw-handle" 
						d="M 50 65 L 50 90" 
						fill="none" 
						strokeWidth="6" 
						strokeLinecap="round" 
					/>
					
					{/* Leaf Outline */}
					<path 
						className="leaf-draw" 
						d="M 52 70 C 70 75, 80 60, 80 40 C 65 40, 48 50, 52 70 Z" 
						fill="none" 
						strokeWidth="4" 
						strokeLinecap="round" 
						strokeLinejoin="round" 
					/>
					{/* Leaf Fill */}
					<path 
						className="leaf-fill" 
						d="M 52 70 C 70 75, 80 60, 80 40 C 65 40, 48 50, 52 70 Z" 
					/>
				</g>
			</svg>
			<h1 className="splash-text mt-8 text-4xl font-extrabold tracking-[0.2em]">FORKLET</h1>
		</div>
	);
};

export default SplashScreen;

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
	}
}

export const usePwaInstallPrompt = () => {
	const [canInstall, setCanInstall] = useState(false);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showPrompt, setShowPrompt] = useState(true);
	const pwaInstalledMarker = 'pwa-install-prompt';

	useEffect(() => {
		const isDismissed = localStorage.getItem(pwaInstalledMarker) === 'true';
		if (isDismissed) {
			setShowPrompt(false);
		}
	}, []);

	const isMobileDevice = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	};

	useEffect(() => {
		const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
			if (localStorage.getItem(pwaInstalledMarker) === 'true') {
				return;
			}

			e.preventDefault();
			setDeferredPrompt(e);
			setCanInstall(true);
		};

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstall as EventListener,
		);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstall as EventListener,
			);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) {
			return;
		}

		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		console.log(`User response to the install prompt: ${outcome}`);

		setDeferredPrompt(null);
		setCanInstall(false);

		if (outcome === 'accepted') {
			localStorage.setItem(pwaInstalledMarker, 'true');
			setShowPrompt(false);
		}
	};

	const handleDismiss = () => {
		setCanInstall(false);
		setShowPrompt(false);
		localStorage.setItem(pwaInstalledMarker, 'true');
	};

	return {
		canInstall,
		showPrompt,
		isMobileDevice: isMobileDevice(),
		handleInstall,
		handleDismiss,
	};
};

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

	// Check if user already dismissed the prompt
	useEffect(() => {
		const isDismissed = localStorage.getItem(pwaInstalledMarker) === 'true';
		if (isDismissed) {
			setShowPrompt(false);
		}
	}, []);

	// Check if device is mobile
	const isMobileDevice = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	};

	useEffect(() => {
		// Only show install prompt on mobile devices
		// if (!isMobileDevice()) return;

		const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
			// Check if user already dismissed
			if (localStorage.getItem(pwaInstalledMarker) === 'true') {
				return;
			}

			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event for later use
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

		// Show the install prompt
		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		console.log(`User response to the install prompt: ${outcome}`);

		// We've used the prompt, and can't use it again, throw it away
		setDeferredPrompt(null);
		setCanInstall(false);

		if (outcome === 'accepted') {
			// Mark that user accepted
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

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
			setShowPrompt(true);
		};

		const handleAppInstalled = () => {
			console.log('[PWA] App installed');
			setCanInstall(false);
			setShowPrompt(false);
			localStorage.setItem(pwaInstalledMarker, 'true');
		};

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstall as EventListener,
		);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstall as EventListener,
			);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	}, []);

	const handleDismiss = () => {
		// Mark as dismissed in localStorage
		localStorage.setItem(pwaInstalledMarker, 'true');
		setShowPrompt(false);
		setDeferredPrompt(null);
	};

	const handleInstall = async () => {
		if (!deferredPrompt) return;

		try {
			// Show the install prompt
			await deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			const { outcome } = await deferredPrompt.userChoice;
			console.log(`[PWA] User response to install prompt: ${outcome}`);

			if (outcome === 'accepted') {
				// PWA was installed
				setCanInstall(false);
				setShowPrompt(false);
				localStorage.setItem(pwaInstalledMarker, 'true');
			} else if (outcome === 'dismissed') {
				// User dismissed the system prompt, mark as dismissed
				localStorage.setItem(pwaInstalledMarker, 'true');
				setShowPrompt(false);
			}

			setDeferredPrompt(null);
		} catch (error) {
			console.error('[PWA] Error during installation:', error);
		}
	};

	return {
		canInstall,
		showPrompt,
		handleDismiss,
		handleInstall,
	};
};

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

// PWA Install Prompt Component
// Shows a notification when PWA can be installed
interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
	}
}

const PwaInstallPrompt = () => {
	const [canInstall, setCanInstall] = useState(false);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showPrompt, setShowPrompt] = useState(true);

	// Check if device is mobile
	const isMobileDevice = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	};

	useEffect(() => {
		// Only show install prompt on mobile devices
		if (!isMobileDevice()) return;
		const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
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
			localStorage.setItem('pwa-installed-prompt-shown', 'true');
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
				localStorage.setItem('pwa-installed-prompt-shown', 'true');
			}

			setDeferredPrompt(null);
		} catch (error) {
			console.error('[PWA] Error during installation:', error);
		}
	};

	if (!canInstall || !showPrompt) return null;

	return (
		<div className="fixed bottom-0 w-full rounded-t-lg border bg-card text-card-foreground shadow-lg p-4 z-50">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<h3 className="font-semibold text-base mb-1">Встановити додаток?</h3>
					<p className="text-sm text-muted-foreground mb-3">
						Встановіть Forksy на домашній екран для швидкого доступу
					</p>
					<div className="flex gap-4">
						<Button onClick={handleInstall} className="h-8 text-xs" size="lg">
							Встановити
						</Button>
						<Button
							onClick={() => setShowPrompt(false)}
							variant="outline"
							className="h-8 text-xs"
							size="lg"
						>
							Пізніше
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PwaInstallPrompt;

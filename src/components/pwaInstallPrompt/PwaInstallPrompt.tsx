import { usePwaInstallPrompt } from '@/hooks';
import { Button } from '../ui/button';

const PwaInstallPrompt = () => {
	const { canInstall, showPrompt, handleDismiss, handleInstall } =
		usePwaInstallPrompt();

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
							onClick={handleDismiss}
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

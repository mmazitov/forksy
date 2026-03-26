import { Button } from '../ui/button';

import { usePwaInstallPrompt } from '@/shared/hooks';

const PwaInstallPrompt = () => {
	const { canInstall, showPrompt, handleDismiss, handleInstall } =
		usePwaInstallPrompt();

	if (!canInstall || !showPrompt) return null;

	return (
		<div className="bg-card text-card-foreground fixed bottom-65 z-50 w-full rounded-t-lg border p-4 shadow-lg">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<h3 className="mb-1 text-base font-semibold">Встановити додаток?</h3>
					<p className="text-muted-foreground mb-3 text-sm">
						Встановіть Mealvy на домашній екран для швидкого доступу
					</p>
					<div className="flex gap-2">
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

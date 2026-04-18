import { useState } from 'react';

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
} from '@/shared/components';

interface InviteMemberDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onInvite: (email: string) => void;
	inviting: boolean;
}

const InviteMemberDialog = ({
	open,
	onOpenChange,
	onInvite,
	inviting,
}: InviteMemberDialogProps) => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) {
			onInvite(email.trim());
			setEmail('');
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Запросити члена сім&apos;ї</DialogTitle>
					<DialogDescription>
						Введіть email адресу людини, яку хочете додати до вашої сім&apos;ї
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="example@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoFocus
							/>
						</div>
						<div className="bg-muted/50 space-y-2 rounded-lg p-4">
							<p className="text-sm font-medium">Член сім&apos;ї зможе:</p>
							<ul className="text-muted-foreground space-y-1 text-sm">
								<li>• Переглядати ваші меню</li>
								<li>• Додавати страви до спільних меню</li>
								<li>• Створювати списки покупок</li>
							</ul>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={inviting}
						>
							Скасувати
						</Button>
						<Button type="submit" disabled={inviting || !email.trim()}>
							{inviting ? 'Надсилання...' : 'Надіслати'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InviteMemberDialog;

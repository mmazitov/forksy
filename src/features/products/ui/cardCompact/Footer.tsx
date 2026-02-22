import { Flame } from 'lucide-react';

interface FooterProps {
	prepTime?: number | null;
	footerType?: string;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	userId?: string | null;
}

const Footer = ({ calories, protein, fat, carbs }: FooterProps) => {
	return (
		<div className="space-y-2">
			{calories !== null && calories !== undefined && (
				<div className="flex items-center gap-1 text-sm">
					<Flame className="text-secondary h-4 w-4" />
					<span className="text-muted-foreground">{calories} ккал/100г</span>
				</div>
			)}

			{(protein !== null || fat !== null || carbs !== null) && (
				<div className="text-muted-foreground flex justify-between gap-3 text-xs">
					{protein !== null && <span>Білки: {protein}г</span>}
					{fat !== null && <span>Жири: {fat}г</span>}
					{carbs !== null && <span>Вуглеводи: {carbs}г</span>}
				</div>
			)}
		</div>
	);
};

export default Footer;

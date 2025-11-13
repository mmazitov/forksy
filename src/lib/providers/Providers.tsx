import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from './QueryProvider';
import SeoProvider from './SeoProvider';
import ThemeProvider from './ThemeProvider';
import TooltipProvider from './TooltipProvider';

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<SeoProvider>
			<QueryProvider>
				<ThemeProvider>
					<TooltipProvider>
						<Toaster />
						<Sonner />
						{children}
					</TooltipProvider>
				</ThemeProvider>
			</QueryProvider>
		</SeoProvider>
	);
};

export default Providers;

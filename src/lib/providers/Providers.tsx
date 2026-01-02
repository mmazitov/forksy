import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { client } from '@/lib/apollo';
import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from './AuthProvider';
import QueryProvider from './QueryProvider';
import SeoProvider from './SeoProvider';
import ThemeProvider from './ThemeProvider';
import TooltipProvider from './TooltipProvider';

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
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
			</AuthProvider>
		</ApolloProvider>
	);
};

export default Providers;

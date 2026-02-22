import { ApolloProvider } from '@apollo/client/react';

import { AuthProvider } from './AuthProvider';
import SeoProvider from './SeoProvider';
import ThemeProvider from './ThemeProvider';
import TooltipProvider from './TooltipProvider';

import { client } from '@/shared/api/apollo';
import { Toaster as Sonner } from '@/shared/components/ui/sonner';
import { Toaster } from '@/shared/components/ui/toaster';
import { composeProviders } from '@/shared/lib/utils/composeProviders';

interface ProvidersProps {
	children: React.ReactNode;
}

const ComposedProviders = composeProviders([
	({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>,
	AuthProvider,
	SeoProvider,
	ThemeProvider,
	TooltipProvider,
]);

const Providers = ({ children }: ProvidersProps) => {
	return (
		<ComposedProviders>
			<Toaster />
			<Sonner />
			{children}
		</ComposedProviders>
	);
};

export default Providers;

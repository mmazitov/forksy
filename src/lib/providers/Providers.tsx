import { ApolloProvider } from '@apollo/client/react';

import { AuthProvider } from './AuthProvider';
import QueryProvider from './QueryProvider';
import SeoProvider from './SeoProvider';
import ThemeProvider from './ThemeProvider';
import TooltipProvider from './TooltipProvider';

import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { client } from '@/lib/apollo';
import { composeProviders } from '@/lib/utils/composeProviders';

interface ProvidersProps {
	children: React.ReactNode;
}

// Compose all providers into a single component
const ComposedProviders = composeProviders([
	({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>,
	AuthProvider,
	SeoProvider,
	QueryProvider,
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

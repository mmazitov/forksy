import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode } from 'react';

interface ThemeProviderProps {
	children: ReactNode;
	attribute?: string;
	defaultTheme?: string;
	enableSystem?: boolean;
	storageKey?: string;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			storageKey="forksy-theme"
		>
			{children}
		</NextThemesProvider>
	);
};

export default ThemeProvider;

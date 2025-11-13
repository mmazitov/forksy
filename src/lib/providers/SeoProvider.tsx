import { HeadProvider } from 'react-head';

interface SeoProviderProps {
	children: React.ReactNode;
}

const SeoProvider = ({ children }: SeoProviderProps) => {
	return <HeadProvider>{children}</HeadProvider>;
};

export default SeoProvider;

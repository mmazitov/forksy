import { ComponentType, ReactNode } from 'react';

type Provider = ComponentType<{ children: ReactNode }>;

export const composeProviders = (
	providers: Provider[],
): ComponentType<{ children: ReactNode }> => {
	return ({ children }: { children: ReactNode }) => {
		return providers.reduceRight((acc, Provider) => {
			return <Provider>{acc}</Provider>;
		}, children);
	};
};

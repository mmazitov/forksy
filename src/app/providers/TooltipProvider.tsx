import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProviderProps {
	children: React.ReactNode;
}

const TooltipProvider = ({ children }: TooltipProviderProps) => {
	return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>;
};

export default TooltipProvider;

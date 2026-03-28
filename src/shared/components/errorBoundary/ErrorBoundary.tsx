import { Component, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className="flex min-h-screen items-center justify-center p-8 text-center">
						<div>
							<h2 className="mb-2 text-xl font-semibold">
								Щось пішло не так
							</h2>
							<p className="text-muted-foreground mb-4 text-sm">
								Сторінку не вдалося завантажити. Спробуйте оновити.
							</p>
							<button
								className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm"
								onClick={() => window.location.reload()}
							>
								Оновити
							</button>
						</div>
					</div>
				)
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

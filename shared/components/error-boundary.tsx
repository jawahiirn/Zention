'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // TODO: Send error to error tracking service (e.g., Sentry, LogRocket)
        // Only log in development to avoid linting errors
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    reset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.reset);
            }

            return (
                <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
                    <div className="max-w-md space-y-4 text-center">
                        <h1 className="text-4xl font-bold text-destructive">Oops! Something went wrong</h1>
                        <p className="text-muted-foreground">{this.state.error.message || 'An unexpected error occurred'}</p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={this.reset} variant="default">
                                Try Again
                            </Button>
                            <Button onClick={() => (window.location.href = '/')} variant="outline">
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

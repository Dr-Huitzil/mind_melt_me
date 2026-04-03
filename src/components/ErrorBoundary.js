import React, { Component } from "react";
import WindowFrame from "./windows/WindowFrame";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(`Window Error caught in ${this.props.app?.name || 'Unknown App'}:`, error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const { app, handleCloseWindow } = this.props;
            return (
                <WindowFrame
                    title={`${app.name} - Application error`}
                    minimized={app.minimized}
                    onClose={() => handleCloseWindow(app.id)}
                    onMinimize={() => { }}
                    zIndex={app.zIndex || 100}
                    defaultSize={{ width: 400, height: 200 }}
                    isResizable={false}
                >
                    <div style={{ padding: '20px', color: 'red', textAlign: 'center', fontFamily: 'monospace' }}>
                        <h2> App Crashed </h2>
                        <p>The application process failed unexpectedly.</p>
                        <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '20px' }}>{this.state.error?.message}</p>
                    </div>
                </WindowFrame>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
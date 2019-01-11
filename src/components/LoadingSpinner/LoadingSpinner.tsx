import * as React from 'react';

import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
    isLoading: boolean;
    height: number;
}

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = props => {
    return (
        <div style={{ minHeight: props.height, maxHeight: props.height }} className="LoadingSpinner">
            Lädt...
        </div>
    );
};

export default LoadingSpinner;

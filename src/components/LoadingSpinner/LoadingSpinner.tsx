import * as React from "react";

export interface LoadingSpinnerProps {
    isLoading: boolean;
}

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = (props) => {

    return (
        <div>Loading...</div>
    );
}

export default LoadingSpinner;
import * as React from 'react';
import './PageLayout.css';

interface Props extends React.HTMLProps<any> {
    maxWidth?: number;
}

class PageLayout extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { maxWidth, style } = this.props;
        const styles: React.CSSProperties = {};
        if (maxWidth !== undefined) {
            styles.maxWidth = maxWidth;
        }
        return (
            <main className={'PageLayout ' + this.props.className} style={{ ...style, ...styles }}>
                {this.props.children}
            </main>
        );
    }
}

export default PageLayout;

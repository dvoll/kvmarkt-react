import * as React from "react";
import { Link } from "react-router-dom";

import './RoundedCard.css';

export interface RoundedCardProps {
    style?: React.CSSProperties;
    className?: string;
    noShadow?: boolean;
    linkTo?: string;
}

class RoundedCard extends React.Component<RoundedCardProps, {}> {

    constructor(props: RoundedCardProps) {
        super(props);
    }

    public render() {
        const style: React.CSSProperties = {
            
            // margin: '0 10px 5px 10px',
            ...this.props.style
        }
        if (this.props.noShadow) {
            style.boxShadow = "none";
        }
        const element = !!this.props.linkTo ? 
            (<Link style={style} className={'RoundedCard-container  ' + this.props.className}  to={this.props.linkTo}>{this.props.children}</Link>) :
            ( <div style={style} className={'RoundedCard-container  ' + this.props.className} >
                {this.props.children}
            </div>);
        return (
            element
        );
    }
}

export default RoundedCard;

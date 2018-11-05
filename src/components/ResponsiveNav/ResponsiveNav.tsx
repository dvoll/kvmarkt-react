import * as React from "react";
import MediaQuery from "react-responsive";

export interface ResponsiveNavProps {
    desktopNav: React.ReactNode;
    mobileNav: React.ReactNode;
    breakpoint?: number;
}

const ResponsiveNav: React.SFC<ResponsiveNavProps> = (props) => {

    return (
        <MediaQuery maxWidth={props.breakpoint || 500}>
            {matches => {
                return matches ? (
                    props.mobileNav
                ) : (
                        props.desktopNav
                    );
            }}
            {/* {matches => {
                    return matches ? (
                        <TabBar navLinks={this.props.navLinks} />
                    ) : (
                        <NavPane {...this.props} />
                    );
                }} */}
        </MediaQuery>
    );
}

export default ResponsiveNav;


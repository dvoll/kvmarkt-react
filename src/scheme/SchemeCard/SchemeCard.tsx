import { BaseButton, BaseHeading, BaseIcon, BaseLabel, ThemeContext } from "@dvll/ulight-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Scheme } from "src/store/schemes/types";
import './SchemeCard.css';
// import images from './kvmarkt-card-images.png';

export interface SchemeCardProps {
    scheme: Scheme;
}

const SchemeCard: React.SFC<SchemeCardProps> = (props) => {
    const {id, title, description, category, categoryName, ageStart, ageEnd, placeName } = props.scheme;

    const detailItemList = [
        {key: "Alter", icon: 'people', value: `${ageStart}-${ageEnd}` },
        {key: "Dauer", icon: 'people', value: `1:20 h` },
        {key: "Ort", icon: 'people', value: placeName || '' },
    ];

    const detailItem = (key: string, value: string | number) => <div key={key} className="detail">
        {/* icon */}
        <span>{value}</span>
        <BaseLabel style={{ letterSpacing: "normal", fontSize: '0.6rem'}} name={key} />
    </div>;

    const detailItems = detailItemList.map((item) => detailItem(item.key, item.value))


    // const iconToggleButton2 = <BaseButton className="iconToggle" style={{ ["--foreground-rgb" as any]: "242, 242, 242", ["--background-rgb" as any]: "223, 72, 72" }}>
    //     {/* <BaseIcon name='cd' /> */}
    //     <BaseIcon style={{ height: 20, padding: '3px 0', fill: "#f2f2f2" }} iconName="check" />
    // </BaseButton>;
    const iconToggleButton = <BaseButton className="iconToggle" icon="cd" >
        {/* <BaseIcon name='cd' /> */}
        <BaseIcon style={{ height: 20, padding: '2px 0'}} iconName="check" />
    </BaseButton>;
    const iconToggleButtonOff = <BaseButton className="iconToggle" >
        {/* <BaseIcon name='cd' /> */}
        <BaseIcon style={{ height: 20, padding: '0'}} iconName="cd" />
    </BaseButton>;

    const badge = <BaseButton 
        className={`badge category-${category}` }
        // icon="bench" 
        style={{ ['--foreground-rgb' as any]: '242, 242, 242', ["--background-rgb" as any]: '170, 84, 84', textTransform: 'uppercase'  }} 
        iconStyle={{height: '100%', paddingBlockStart: 0, paddingBlockEnd: 0}} 
        title={categoryName} 
    />


    return (
        <ThemeContext.Consumer>
            { theme => {
                const styles = {
                    ["--foreground-rgb" as any]: theme.foreground,
                    ["--secondary-rgb" as any]: theme.secondary,
                    ["--background-rgb" as any]: theme.background,
                    // ...style
                };
                return( 
                <Link className="SchemeCard" style={styles} to={`schemes/${id}`} key={id}>
                    {Math.random() > 0.7 ? iconToggleButton : iconToggleButtonOff}
                    <BaseHeading level={2} title={title} />
                    <p>{description}</p>
                    {/* images */}
                    { Math.random() > 0.5 ? <div className="images" /> : null}
                    <div className="details">{ detailItems } </div>
                    { badge } 
                </Link>)
            }}
        </ThemeContext.Consumer>
    );
        // </Link>;
}

export default (React as any).memo(SchemeCard, ({ scheme }: SchemeCardProps, {scheme: nextScheme}: SchemeCardProps) => {
    return true;
    // return scheme.id === nextScheme.id &&
    //     scheme.title === nextScheme.title &&
    //     scheme.category === nextScheme.category &&
    //     scheme.place === nextScheme.place &&
    //     scheme.author === nextScheme.author &&
    //     scheme.description === nextScheme.description;
});


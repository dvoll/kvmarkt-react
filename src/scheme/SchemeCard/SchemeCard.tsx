import { BaseButton, BaseHeading, BaseIcon, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import { Scheme } from "src/scheme";
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

    const detailItem = (key: string, value: string | number) => <div className="detail">
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


    return <a className="SchemeCard" key={id}>
        {Math.random() > 0.7 ? iconToggleButton : iconToggleButtonOff}
            <BaseHeading level={2} title={title} />
            <p>{description}</p>
            {/* images */}
            { Math.random() > 0.5 ? <div className="images" /> : null}
            <div className="details">{ detailItems } </div>
            { badge } 
        </a>;
}

export default SchemeCard;


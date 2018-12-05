import {
    BaseButton,
    BaseHeading,
    BaseIcon,
    BaseLabel
} from "@dvll/ulight-react";
import * as React from "react";
import BaseLink from "src/components/BaseLink/BaseLink";
import FlexItemRow from "src/components/FlexItemRow/FlexItemRow";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import withTitle from "src/components/layout/PageLayout/withTitleComponent";
import RoundedCard from "src/components/RoundedCard/RoundedCard";
import BlogPostCard from "src/container/BlogPostCard/BlogPostCard";
import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
import { Scheme } from "src/store/schemes/types";

export interface WithTitleHandlerProps {
    titleHandler: any;
    backButtonEnableHandler: any;
}

class Dashboard extends React.Component<WithTitleHandlerProps, {}> {
    private blogPosts: BlogPost[] = [
        {
            id: 1,
            title: "New Title",
            subtitle: "04. Dezember",
            imageUrl: "https://picsum.photos/275/350"
        },
        {
            id: 2,
            title: "New Title",
            subtitle: "04. Dezember",
            imageUrl: "https://picsum.photos/275/340"
        },
        {
            id: 3,
            title: "Blogpost",
            subtitle: "02. Dezember",
            imageUrl: "https://picsum.photos/275/330"
        }
    ];

    private dashboardSchemes: Scheme[] = [
        {
            id: 47,
            title: "Peters Programmname",
            description:
                "Gib hier eine kurze Beschreibung ein, um direkt zu sehen, worum es in deinem Programm geht.",
            content:
                "<div>Hier kannst du ausfürhlich dein Programm beschrteiben.</div>",
            place: 1,
            placeName: "Wald",
            category: 1,
            categoryName: "Geländespiel",
            ageStart: 0,
            ageEnd: 0,
            author: 2,
            authorName: "Max Muster",
            isFavorite: false
        },
        {
            id: 102,
            title: "18:00 Programmname",
            description:
                "Gib hier eine kurze Beschreibung ein, um direkt zu sehen, worum es in deinem Programm geht.",
            content:
                "<div>Hier kannst du ausfürhlich dein Programm beschrteiben.</div>",
            place: 1,
            placeName: "Wald",
            category: 6,
            categoryName: "Bibelarbeit",
            ageStart: 6,
            ageEnd: 9,
            author: 2,
            authorName: "Max Muster",
            isFavorite: true
        }
    ];

    private dashboardItems = [
        {
            id: 1,
            title: "Von uns für Dich",
            subtitle: "Neuigkeiten",
            items: this.blogPosts,
            actions: [
                {
                    type: "internalLink",
                    text: "Alle Beiträge lesen",
                    to: "admin"
                }
            ]
        },
        {
            id: 2,
            title: "Von Euch für Dich",
            subtitle: "Neuigkeiten",
            items: this.blogPosts,
            actions: [
                {
                    type: "internalLink",
                    text: "Alle Programme",
                    to: "schemes"
                },
                {
                    type: "internalLink",
                    text: "Alle Programme",
                    to: "schemes/new"
                }
            ]
        }
    ];

    public componentDidMount() {
        // this.props.titleHandler('Dashboard');
    }

    public render() {
        return (
            <PageLayout className="Dashboard">
                <BaseLabel name="Dashboard" />
                <BaseHeading level={1}>Hallo, Max</BaseHeading>
                <FlexItemRow>
                    {this.roundedTitleCard(this.dashboardItems[0])}
                    {this.blogPosts.map(item => (
                        <BlogPostCard key={item.id} blogpost={item} />
                    ))}
                </FlexItemRow>
                <FlexItemRow style={{ ["--row-height" as any]: 350 }}>
                    {this.roundedTitleCard(this.dashboardItems[1])}
                    {this.dashboardSchemes.map(item => (
                        <SchemeCard
                            key={item.id}
                            scheme={item}
                            style={{ margin: 0, borderRadius: 10, height: 350 }}
                        />
                    ))}
                </FlexItemRow>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="gear" />
                    <span>Link</span>
                </BaseLink>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="lock" />
                    <span>Link</span>
                </BaseLink>
                <br />
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="arrow-right" />
                    <span>Neues Programm</span>
                </BaseLink>
                <br />
                <BaseLink to="/schemes">
                    <BaseIcon style={{ height: 13 }} iconName="arrow-right" />
                    <span>Alle Programme</span>
                </BaseLink>
                <br />
                <BaseButton title="Speichern und veröffentlichen" icon="gear" />
                <BaseButton title="Speichern und veröffentlichen" icon="gear">
                    Speichern und veröffentlichen
                </BaseButton>
                <BaseLabel name="Label" />
                <BaseButton title="Speichern und veröffentlichen" icon="lock" />
            </PageLayout>
        );
    }

    public roundedTitleCard = (item: any) => (
        <RoundedCard
            noShadow
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "auto"
            }}
        >
            <BaseLabel name={item.subtitle} />
            <BaseHeading level={2}>{item.title}</BaseHeading>
            {/* TODO: Add Actions */}
        </RoundedCard>
    );
}

export default withTitle(Dashboard, 'Dashboard');

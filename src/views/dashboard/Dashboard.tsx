import {
    BaseButton,
    BaseHeading,
    BaseIcon,
    BaseLabel
} from "@dvll/ulight-react";
import * as React from "react";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import BaseLink from "src/components/BaseLink/BaseLink";
import FlexItemRow from "src/components/FlexItemRow/FlexItemRow";
import PageLayout from "src/components/layout/PageLayout/PageLayout";
import withTitle from "src/components/layout/PageLayout/withTitleComponent";
import RoundedCard from "src/components/RoundedCard/RoundedCard";
import BlogPostCard from "src/container/BlogPostCard/BlogPostCard";
import SchemeCard from "src/scheme/SchemeCard/SchemeCard";
import { ApplicationState } from "src/store";
import * as blogPostsActions from "src/store/blogposts/actions";
import { BlogPostsState } from "src/store/blogposts/types";
import { SchemesState } from "src/store/schemes/types";

export interface WithTitleHandlerProps {
    titleHandler: any;
    backButtonEnableHandler: any;
}

interface DispatchProps {
    fetchBlogPosts: () => any;
}

class Dashboard extends React.Component<WithTitleHandlerProps & { blogPostsState: BlogPostsState, schemesState: SchemesState } & DispatchProps, {}> {

    private dashboardItems = [
        {
            id: 1,
            title: "Von uns für Dich",
            subtitle: "Neuigkeiten",
            // items: this.blogPosts,
            actions: [
                {
                    id: 1,
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
            // items: this.blogPosts,
            actions: [
                {
                    id: 1,
                    type: "internalLink",
                    text: "Alle Programme",
                    to: "schemes"
                },
                {
                    id: 1,
                    type: "internalLink",
                    text: "Programm hinzufügen",
                    to: "schemes/new"
                }
            ]
        }
    ];

    public render() {
        const blogPosts = this.props.blogPostsState.data;
        const dashboardSchemes = this.props.schemesState.data.slice(0, 3);
        return <PageLayout className="Dashboard">
            <BaseLabel name="Dashboard" />
            <BaseHeading level={1}>Hallo, Max</BaseHeading>
            <FlexItemRow style={{ ["--row-height" as any]: "23.125em" }}>
                {this.roundedTitleCard(this.dashboardItems[0])}
                {blogPosts.map(item => (
                    <BlogPostCard key={item.id} blogpost={item} style={{ height: "23.125em"}} />
                ))}
            </FlexItemRow>
            <FlexItemRow style={{ ["--row-height" as any]: "23.125em" }}>
                {this.roundedTitleCard(this.dashboardItems[1])}
                {dashboardSchemes.map(item => (
                    <SchemeCard
                        key={item.id}
                        scheme={item}
                        style={{
                            margin: 0,
                            borderRadius: 10,
                            height: "23.125em"
                        }}
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
        </PageLayout>;
    }

    public roundedTitleCard = (item: any) => (
        <RoundedCard noShadow >
            <BaseLabel name={item.subtitle} />
            <BaseHeading level={2}>{item.title}</BaseHeading>
            {/* TODO: Add Actions */}
            {item.actions.map((action: any) => {
                return <BaseLink key={action.id} to={action.to} >
                    <BaseIcon style={{ height: 16 }} iconName="arrow-right" />
                    <span>{action.text}</span>
                </BaseLink>
            }) }
        </RoundedCard>
    );

}

    
    const mapStateToProps = ({ blogPostsState, schemesState }: ApplicationState) => ({
        blogPostsState,
        schemesState
    })

    const mapDispatchToProps = (dispatch: Dispatch) => ({
        fetchBlogposts: () => dispatch(blogPostsActions.fetchRequest()),
    });

    export default compose(
        connect(
            mapStateToProps,
            mapDispatchToProps
        ),
        withTitle('Dashboard')
        // withTitle(''),
        // withBackButton(false)
    )(Dashboard)
// export default ;

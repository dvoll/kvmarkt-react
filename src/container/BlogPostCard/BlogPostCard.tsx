import { BaseHeading, BaseLabel } from "@dvll/ulight-react";
import * as React from "react";
import RoundedCard from "src/components/RoundedCard/RoundedCard";
import { BlogPost } from "src/store/blogposts/types";

export interface BlogPostCardProps {
    blogpost: BlogPost;
    // style?: React.CSSProperties;
    // className: string;
}

class BlogPostCard extends React.Component<BlogPostCardProps, {}> {

    constructor(props: BlogPostCardProps) {
        super(props);
    }

    public render() {
        const { blogpost } = {...this.props};
        const style: React.CSSProperties = {
            boxSizing: 'border-box',
            backgroundColor: 'rgb(255, 232, 191)',
            backgroundImage: `url('${blogpost.imageUrl}')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            padding: '20px 15px',
            height: 350,
            // ...this.props.style
        }
        return (
            <RoundedCard style={style} key={blogpost.id} linkTo={'schemes/' + blogpost.id} >
                <BaseLabel name={blogpost.subtitle} />
                <BaseHeading level={2} >{blogpost.title}</BaseHeading>
            </RoundedCard>
        );
    }
}

export default BlogPostCard;


export interface Scheme {
    id: number;
    title: string;
    description: string;
    content?: string;
    placeName?: string;
    place: number;
    place2?: number;
    place3?: number;
    authorName?: string;
    author: number;
    categoryName?: string;
    category: number;
    ageStart: number;
    ageEnd: number;
    likeCount?: number;
    status?: string;
    created?: Date;
    updated?: string;
    isFavorite?: boolean;
}

export * from './SchemeCard/SchemeCard';

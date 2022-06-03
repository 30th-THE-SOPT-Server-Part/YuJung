import { MovieCommentInfo } from "./MovieInfo";

export interface MovieGetDto {
    title: String;
    director: String;
    startDate?: Date;
    thumbnail?: String;
    story?: String;
    comments?: MovieCommentInfo[];
};
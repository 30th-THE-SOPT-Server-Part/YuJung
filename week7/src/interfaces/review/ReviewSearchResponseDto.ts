import { ReviewResponseDto } from "./ReviewResponseDto";

export interface ReviewSearchResponseDto {
    currentPage: number;
    lastPage: number;
    reviews: ReviewResponseDto[];
}
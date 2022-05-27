/**
 * reference 활용
 * blog
 * - userId (작성자)
 * - title (제목)
 * - contents (내용)
 * - date (timestamp) - 날짜, 시간
 */

export interface BlogInfo {
    userId: String;
    title: String;
    contents: String;
    date: TimeRanges;
};
const message = {
    NULL_VALUE: '필요한 값이 없습니다.',
    NOT_FOUND: '존재하지 않는 자원',
    BAD_REQUEST: '잘못된 요청',
    INTERNAL_SERVER_ERROR: '서버 내부 오류',

    //auth
    NULL_VALUE_TOKEN: '토큰값이 없습니다',
    INVALID_TOKEN: '토큰이 만료되었습니다',

    //user
    CREATE_USER_SUCCESS: '유저 생성 성공',
    DUPLICATED_EMAIL: '중복된 이메일입니다',
    INVALID_PASSWORD: '비밀번호가 일치하지 않습니다',
    SIGNIN_USER_SUCCESS: '로그인 성공',
    
    // review 
    CREATE_REVIEW_SUCCESS: '리뷰 작성 성공',
    READ_REVIEW_SUCCESS: '리뷰 조회 성공',
    SEARCH_REVIEW_SUCCESS: '리뷰 검색 성공',
    SEARCH_REVIEW_NO_RESULT: '리뷰 검색 결과 없음',

    //movie
    CREATE_MOVIE_SUCCESS: '영화 정보 생성 성공',
    FIND_MOVIE_SUCCESS: '영화 정보 조회 성공',
    UPDATE_MOVIE_SUCCESS: '영화 정보 수정 성공',
    DELETE_MOVIE_SUCCESS: '영화 정보 삭제 성공',
    CREATE_MOVIE_COMMENT_SUCCESS: '영화 코멘트 생성 성공',
    UPDATE_MOVIE_COMMENT_SUCCESS: '영화 코멘트 수정 성공',
    SEARCH_MOVIE_SUCCESS: '영화 검색 성공',
    SEARCH_MOVIE_NO_RESULT: '영화 검색 결과 없음',

    // file
    CREATE_FILE_SUCCESS: '한개의 파일 업로드 성공',
    CREATE_FILES_SUCCESS: '다수의 파일 업로드 성공',
}

export default message;
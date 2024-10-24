import { Helmet } from 'react-helmet';

// 기본 메타 정보
const defaultMeta = {
    title: "최고의 계산기 모음 사이트 | 건강, 부동산, 재정, 취미 계산기",
    description: "최고의 계산기 모음 사이트에서 칼로리, BMR, BMI, 체지방률, 체수분량, 심박수, 운동 칼로리, 허리-엉덩이 비율, 단백질 섭취량, 대출 상환, 적금/예금 이자, 연금, 세금, 전기 요금, 물, 시간 관리, 운전 비용, 여행 경비, 사진 용량, 음악 BPM 등 다양한 계산기를 손쉽게 이용해 보세요.",
    keywords: "칼로리 계산기, 대출 계산기, 단백질 섭취량 계산기, BMI, BMR, 체지방률 계산기, 체수분량 계산기, 심박수 계산기, 운동 칼로리 계산기, 연금 계산기, 세금 계산기",
    image: "favicon.png"
};

const MetaTags = () => {
    const siteUrl = "https://dodamking.github.io/calculator";  // 마지막 슬래시 제거

    return (
        <Helmet>
            {/* 기본 메타 태그 */}
            <title>{defaultMeta.title}</title>
            <meta name="description" content={defaultMeta.description} />
            <meta name="keywords" content={defaultMeta.keywords} />

            {/* OG 태그 */}
            <meta property="og:url" content={siteUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={defaultMeta.title} />
            <meta property="og:description" content={defaultMeta.description} />
            <meta property="og:image" content={`${siteUrl}/${defaultMeta.image}`} />

            {/* 트위터 카드 */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={defaultMeta.title} />
            <meta name="twitter:description" content={defaultMeta.description} />
            <meta name="twitter:image" content={`${siteUrl}/${defaultMeta.image}`} />
        </Helmet>
    );
};

export default MetaTags;
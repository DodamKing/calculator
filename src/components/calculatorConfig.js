export const calculators = {
    'calorie_calculator': {
        name: "칼로리 계산기",
        component: () => import("./health/calorie")
    },
    'protein_intake_calculator': {
        name: "단백질 섭취량 계산기",
        component: () => import("./health/protein")
    },
    'bmi_calculator': {
        name: "BMI 계산기",
        component: () => import("./health/bmi")
    },
    'bmr_calculator': {
        name: "기초 대사량(BMR) 계산기",
        component: () => import("./health/bmr")
    },
    'body_fat_calculator': {
        name: "체지방률 계산기",
        component: () => import("./health/bodyfat")
    },

    // 재정
    'loan_calculator': {
        name: "대출 상환 계산기",
        component: () => import("./finances/loan")
    },

    // 생활
    'electricity_calculator': {
        name: "체지방률 계산기",
        component: () => import("./life/electricity")
    },

    // 취미
    'travel_expense_calculator': {
        name: "여행경비 계산기",
        component: () => import("./hobby/travel")
    },
    'photo_storage_calculator': {
        name: "사진 용량 계산기",
        component: () => import("./hobby/photo")
    },
};

export const categories = [
    {
        name: "건강",
        image: "https://picsum.photos/id/10/50/50",
        items: [
            { name: "칼로리 계산기", section: "calorie_calculator" },
            { name: "기초 대사량(BMR) 계산기", section: "bmr_calculator" },
            { name: "BMI 계산기", section: "bmi_calculator" },
            { name: "체지방률 계산기", section: "body_fat_calculator" },
            { name: "체수분량 계산기", section: "water_calculator" },
            { name: "심박수 계산기", section: "heart_rate_calculator" },
            { name: "운동 칼로리 소모량 계산기", section: "exercise_calorie_calculator" },
            { name: "허리-엉덩이 비율 계산기", section: "waist_hip_ratio_calculator" },
            { name: "단백질 섭취량 계산기", section: "protein_intake_calculator" }
        ]
    },
    {
        name: "재정",
        image: "https://picsum.photos/id/20/50/50",
        items: [
            { name: "대출 상환 계산기", section: "loan_calculator" },
            { name: "적금/예금 이자 계산기", section: "savings_calculator" },
            { name: "연금 계산기", section: "pension_calculator" },
            { name: "세금 계산기", section: "tax_calculator" }
        ]
    },
    {
        name: "생활",
        image: "https://picsum.photos/id/30/50/50",
        items: [
            { name: "전기 요금 계산기", section: "electricity_calculator" },
            { name: "물 사용량 계산기", section: "water_usage_calculator" },
            { name: "시간 관리 계산기", section: "time_management_calculator" },
            { name: "운전 비용 계산기", section: "driving_cost_calculator" }
        ]
    },
    {
        name: "취미",
        image: "https://picsum.photos/id/40/50/50",
        items: [
            { name: "여행 경비 계산기", section: "travel_expense_calculator" },
            { name: "사진 용량 계산기", section: "photo_storage_calculator" },
            { name: "음악 BPM 계산기", section: "music_bpm_calculator" }
        ]
    }
];
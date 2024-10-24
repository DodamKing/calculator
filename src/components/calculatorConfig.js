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
    'water_calculator': {
        name: "체수분량 계산기",
        component: () => import("./health/water")
    },
    'heart_rate_calculator': {
        name: "심박수 계산기",
        component: () => import("./health/heart")
    },
    'exercise_calorie_calculator': {
        name: "운동 칼로리 소모량 계산기",
        component: () => import("./health/exercise_calorie_calculator")
    },
    'waist_hip_ratio_calculator': {
        name: "허리-엉덩이 비율 계산기",
        component: () => import("./health/waist_hip_ratio_calculator")
    },

    // 부동산
    'mortgage_calculator': {
        name: "주택 담보 대출 계산기",
        component: () => import("./budongsan/mortgage_calculator")
    },
    'rent_vs_buy_calculator': {
        name: "임대료 대비 구매 가격 계산기",
        component: () => import("./budongsan/rent_vs_buy_calculator")
    },
    'real_estate_investment_calculator': {
        name: "부동산 투자 수익률 계산기",
        component: () => import("./budongsan/real_estate_investment_calculator")
    },
    'property_tax_calculator': {
        name: "부동산 보유세 계산기",
        component: () => import("./budongsan/property_tax_calculator")
    },

    // 재정
    'loan_calculator': {
        name: "대출 상환 계산기",
        component: () => import("./finances/loan")
    },
    // 'savings_calculator': {
        //     name: "적금/예금 이자 계산기",
        //     component: () => import("./finances/savings_calculator")
        // },
    'pension_calculator': {
        name: "연금 계산기",
        component: () => import("./finances/pension_calculator")
    },
    'value_added_tax_calculator': {
        name: "부가가치세 계산기",
        component: () => import("./finances/value_added_tax_calculator")
    },
    'income_tax_calculator': {
        name: "소득세 계산기",
        component: () => import("./finances/income_tax_calculator")
    },
        
    // 생활
    'electricity_calculator': {
        name: "전기 요금 계산기",
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
    'music_bpm_calculator': {
        name: "음악 BPM 계산기",
        component: () => import("./hobby/bpm")
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
        name: "부동산",
        image: "https://picsum.photos/id/20/50/50",
        items: [
            { name: "주택담보대출 계산기", section: "mortgage_calculator" },
            { name: "임대료 대비 구매 가격 계산기", section: "rent_vs_buy_calculator" },
            { name: "부동산 투자 수익률", section: "real_estate_investment_calculator" },
            { name: "부동산 보유세 계산기", section: "property_tax_calculator" },
            { name: "수익형 부동산 투자 계산기", section: "cash_flow_analysis_calculator" }
        ]
    },
    {
        name: "재정",
        image: "https://picsum.photos/id/30/50/50",
        items: [
            { name: "대출 상환 계산기", section: "loan_calculator" },
            { name: "적금/예금 이자 계산기", section: "savings_calculator" },
            { name: "연금 계산기", section: "pension_calculator" },
            { name: "세금 계산기", section: "tax_calculator" },
            { name: "부가가치세 계산기", section: "value_added_tax_calculator" },
            { name: "소득세 계산기", section: "income_tax_calculator" }
        ]
    },
    // {
    //     name: "생활",
    //     image: "https://picsum.photos/id/40/50/50",
    //     items: [
    //         { name: "전기 요금 계산기", section: "electricity_calculator" },
    //         { name: "물 사용량 계산기", section: "water_usage_calculator" },
    //         { name: "시간 관리 계산기", section: "time_management_calculator" },
    //         { name: "운전 비용 계산기", section: "driving_cost_calculator" }
    //     ]
    // },
    {
        name: "취미",
        image: "https://picsum.photos/id/50/50/50",
        items: [
            { name: "여행 경비 계산기", section: "travel_expense_calculator" },
            { name: "사진 용량 계산기", section: "photo_storage_calculator" },
            { name: "음악 BPM 계산기", section: "music_bpm_calculator" }
        ]
    }
];
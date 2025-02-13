interface IProduct {
    /** ID */
    id?: string;
    /** 상품명 */
    name: string;
    /** 상품 가격 */
    price: number;
    /** 상품 설명 */
    description: string;
    /** 선택검사 */
    selective?: string[];
    /** 병원 */
    hospital: {
        /** 이름 */
        hospitalName: string;
        /** 주소 */
        address: string;
        /** 위도 */
        latitude?: string;
        /** 경도 */
        longitude?: string;
        /** 전화번호 */
        businessNumber: string;
    };
}

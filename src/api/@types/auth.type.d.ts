interface ILoginResponse {
    /** ID */
    id: string;
    /** 비밀번호 */
    password: string;
    /** 이름 */
    name: string;
    /** 이메일 */
    email: string;
    /** 권한 */
    role?: role;
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

type loginRequestBody = {
    id: string;
    password: string;
    name: string;
    email: string;
    role?: role;
    hospital: {
        hospitalName: string;
        address: string;
        latitude?: string;
        longitude?: string;
        businessNumber: string;
    };
};

type loginRequest = {
    body: loginRequestBody;
};

type ILoginResponse = {
    id: string;
    password: string;
    name: string;
    email: string;
    role?: role;
    hospital: {
        hospitalName: string;
        address: string;
        latitude?: string;
        longitude?: string;
        businessNumber: string;
    };
};

type loginResponse = {
    accessToken: string;
    refreshToken: string;
    user: ILoginResponse;
};

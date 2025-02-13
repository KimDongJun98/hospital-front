import { pathToUrl } from "@/utils/url";
import { AxiosInstance } from "axios";

const AUTH_ROUTES = {
    LOGIN: `/api/auth/login`,
    LOGOUT: `/api/auth/logout`,
} as const;

export class AuthService {
    _ajax: AxiosInstance;

    constructor(_ajax: AxiosInstance) {
        this._ajax = _ajax;
    }

    async login(req: loginRequest): Promise<loginResponse> {
        const { body } = req;
        const { data } = await this._ajax.post(
            pathToUrl(AUTH_ROUTES.LOGIN, {}),
            body
        );
        return data;
    }
}

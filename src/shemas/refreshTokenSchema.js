import * as Yup from "yup";

export const refreshTokenSchema = Yup.object().shape({
    refreshToken: Yup.string()
    .required("Refresh token is required")
    .matches(
        /^[A-Za-z0-9-._~+/]+=*$/,
      ),
});
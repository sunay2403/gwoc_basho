def set_auth_cookies(response, access_token, refresh_token):
    response.set_cookie(
        key="access",
        value=access_token,
        httponly=True,
        secure=False,      # True in production (HTTPS)
        samesite="Lax",
        max_age=15 * 60,
    )

    response.set_cookie(
        key="refresh",
        value=refresh_token,
        httponly=True,
        secure=False,      # True in production
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,
    )

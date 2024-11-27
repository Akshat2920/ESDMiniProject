package com.akshat.esd.mini.helper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RequestInterceptor implements HandlerInterceptor {
    private final JWTHelper jwtUtil;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        // System.out.println(request);
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            System.out.println(authorizationHeader);
            System.out.println(request.getHeaderNames());
            return false;
        }

        String token = authorizationHeader.substring(7); // Extract token from "Bearer {token}"
        String username = jwtUtil.extractUsername(token);

        if (username == null || !jwtUtil.validateToken(token, username)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            System.out.println("incorrect token");
            return false;
        }

        return true;
    }
}

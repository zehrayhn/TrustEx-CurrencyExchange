package com.example.trustex.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LogManager.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        //response a error u ekledik. herhangi bir authorization sorunu olduğunda yani bir error geldiğinde unauthorized diye response a ekleyeceğiz.
        logger.error("Unauthorized: %s " , authException.getMessage());
        logger.error("Requested URL: %s " , request.getRequestURI());

        //response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        //response.sendError(401,"Unauthorized");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized Message: ");


    }


}

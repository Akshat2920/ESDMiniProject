package com.akshat.esd.mini.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.akshat.esd.mini.helper.RequestInterceptor;

@Configuration
@EnableWebSecurity

public class SecurityConfig implements WebMvcConfigurer{
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(request -> 
                    request.getMethod().equals("GET") || 
                    request.getMethod().equals("POST") ||
                    request.getMethod().equals("OPTIONS")
                ).permitAll()
                .anyRequest().permitAll()
            );
            
        return http.build();
    }

    private final RequestInterceptor requestInterceptor;

    public SecurityConfig(RequestInterceptor requestInterceptor) {
        this.requestInterceptor = requestInterceptor;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/api/v1/auth/**","/api/v1/admins");
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}

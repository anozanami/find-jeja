package com.example.hintgamedb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 보호 비활성화 (개발용, 프로덕션에서는 활성화 고려)
            .authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN") // /admin 경로에 대한 접근은 ADMIN 역할만 허용
                .anyRequest().permitAll() // 그 외 모든 요청은 허용
                .and()
            .formLogin() // 폼 로그인 활성화
                .loginPage("/login") // 커스텀 로그인 페이지 (필요시)
                .permitAll()
                .and()
            .logout() // 로그아웃 활성화
                .permitAll();
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails admin = User.withUsername("admin")
            .password(passwordEncoder.encode("392766yyc@!")) // 비밀번호 인코딩
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
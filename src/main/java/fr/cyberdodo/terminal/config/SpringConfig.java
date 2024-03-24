package fr.cyberdodo.terminal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.security.SecureRandom;

@Configuration
public class SpringConfig implements WebMvcConfigurer {

    @Bean
    public SecureRandom random() {
        return new SecureRandom();
    }
}

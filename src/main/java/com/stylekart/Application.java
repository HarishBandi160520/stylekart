package com.stylekart;

import com.stylekart.entity.User;
import com.stylekart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("harish").isEmpty()) {
                User user = new User();
                user.setUsername("harish");
                user.setPassword(passwordEncoder.encode("123456"));
                user.setEmail("harish@example.com");
                user.setRole("ROLE_USER");
                userRepository.save(user);
                System.out.println("User 'harish' created with password '123456'");
            }
        
    
        };
    }
}

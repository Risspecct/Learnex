package users.rishik.Learnex.Services;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import users.rishik.Learnex.Dtos.LoginDto;
import users.rishik.Learnex.Exceptions.NotFoundException;
import users.rishik.Learnex.Models.User;
import users.rishik.Learnex.Models.UserView;
import users.rishik.Learnex.Repositories.UserRepository;
import users.rishik.Learnex.Security.JwtService;
import users.rishik.Learnex.Util.UserDto;
import users.rishik.Learnex.Util.UserMapper;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private HttpServletRequest request;

    UserService(UserRepository userRepository, UserMapper userMapper,
                AuthenticationManager authenticationManager, JwtService jwtService){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public UserView addUser(UserDto dto){
        if (userRepository.existsByEmail(dto.getEmail()))
            throw new IllegalArgumentException("Email already exists");
        dto.setPassword(encoder.encode(dto.getPassword()));
        User user = this.userMapper.toUsers(dto);
        this.userRepository.save(user);

        log.info("Creating a user with username: {}", user.getEmail());
        return this.userRepository.findUserByEmail(user.getEmail());
    }

    public UserView getUser(long id){
        return this.userRepository.findUserById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public void deleteUser(long id){
        this.getUser(id);

        log.info("Attempting to delete user with id: {}", id);
        this.userRepository.deleteById(id);
        log.info("User with id: {} deleted successfully", id);
    }

    public int getUserId() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            return jwtService.extractUserId(jwt);
        }
        throw new RuntimeException("Authorization header missing or invalid");
    }

    public String verify(LoginDto user){
        Authentication auth = this.authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (auth.isAuthenticated()){
            User existingUser = this.userRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new NotFoundException("User not found with email: " + user.getEmail()));
            return this.jwtService.generateToken(existingUser);
        } else
            return "Login Failed. Please try again";
    }
}

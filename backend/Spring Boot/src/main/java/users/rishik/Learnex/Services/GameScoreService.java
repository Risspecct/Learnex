package users.rishik.Learnex.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import users.rishik.Learnex.Dtos.GameScoreDto;
import users.rishik.Learnex.Exceptions.NotFoundException;
import users.rishik.Learnex.Models.GameScore;
import users.rishik.Learnex.Models.User;
import users.rishik.Learnex.Repositories.GameScoreRepository;
import users.rishik.Learnex.Repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameScoreService {

    private final GameScoreRepository gameScoreRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public void syncScores(List<GameScoreDto> scoreDtos) {
        long userId = userService.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

        List<GameScore> scoresToSave = scoreDtos.stream()
                .map(dto -> GameScore.builder()
                        .level(dto.getLevel())
                        .score(dto.getLevel())
                        .stars(dto.getStars())
                        .timestamp(dto.getTimestamp())
                        .user(user)
                        .build())
                .collect(Collectors.toList());

        gameScoreRepository.saveAll(scoresToSave);
    }
}
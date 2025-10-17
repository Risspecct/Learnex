package users.rishik.Learnex.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@Data
public class GameScoreDto {
    int level;
    int score;
    int stars;
    Instant timestamp;
}
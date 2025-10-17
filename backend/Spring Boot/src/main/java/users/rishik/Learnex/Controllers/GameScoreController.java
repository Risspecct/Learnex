package users.rishik.Learnex.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import users.rishik.Learnex.Dtos.GameScoreDto;
import users.rishik.Learnex.Services.GameScoreService;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
public class GameScoreController {

    private final GameScoreService gameScoreService;

    @PostMapping("/sync")
    public ResponseEntity<Void> syncScores(@RequestBody List<GameScoreDto> scores) {
        gameScoreService.syncScores(scores);
        return ResponseEntity.ok().build();
    }
}
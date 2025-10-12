package users.rishik.Learnex.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import users.rishik.Learnex.Dtos.AiGenerateRequestDto;
import users.rishik.Learnex.Dtos.TranslateRequestDto;
import users.rishik.Learnex.Dtos.TranslateResponseDto;
import users.rishik.Learnex.Services.AiProxyService;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiProxyService aiProxyService;

    @PostMapping("/generate")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<String> generate(@RequestBody AiGenerateRequestDto request) {
        return ResponseEntity.ok(aiProxyService.generateContent(request));
    }

    @PostMapping("/translate")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<TranslateResponseDto> translate(@RequestBody TranslateRequestDto request) {
        return ResponseEntity.ok(aiProxyService.translateText(request.getText(), request.getDest_lang()));
    }
}
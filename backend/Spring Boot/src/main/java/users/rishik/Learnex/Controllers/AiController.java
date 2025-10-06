package users.rishik.Learnex.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import users.rishik.Learnex.Dtos.AiGenerateRequestDto;
import users.rishik.Learnex.Dtos.TranslateResponseDto;
import users.rishik.Learnex.Services.AiProxyService;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiProxyService aiProxyService;

    @PostMapping("/generate")
    @PreAuthorize("hasRole('USER')")
    public Mono<ResponseEntity<String>> generate(@RequestBody AiGenerateRequestDto request) {
        return aiProxyService.generateContent(request)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/translate")
    @PreAuthorize("hasRole('USER')")
    public Mono<ResponseEntity<TranslateResponseDto>> translate(
            @RequestParam String text,
            @RequestParam String dest_lang) {
        return aiProxyService.translateText(text, dest_lang)
                .map(ResponseEntity::ok);
    }
}
package users.rishik.Learnex.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import users.rishik.Learnex.Dtos.AiGenerateRequestDto;
import users.rishik.Learnex.Dtos.TranslateResponseDto;

@Service
@RequiredArgsConstructor // Lombok annotation for constructor injection
public class AiProxyService {

    private final WebClient pythonWebClient; // Injects the bean from Step 1

    public Mono<String> generateContent(AiGenerateRequestDto request) {
        return pythonWebClient.post()
                .uri("/ai/generate") // The path on the Python service
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class); // Expecting the raw text response
    }

    public Mono<TranslateResponseDto> translateText(String text, String destLang) {
        return pythonWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/translate/")
                        .queryParam("text", text)
                        .queryParam("dest_lang", destLang)
                        .build())
                .retrieve()
                .bodyToMono(TranslateResponseDto.class);
    }
}
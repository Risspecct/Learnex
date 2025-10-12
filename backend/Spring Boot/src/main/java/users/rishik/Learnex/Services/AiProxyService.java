package users.rishik.Learnex.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import users.rishik.Learnex.Dtos.AiGenerateRequestDto;
import users.rishik.Learnex.Dtos.TranslateRequestDto;
import users.rishik.Learnex.Dtos.TranslateResponseDto;

@Service
@RequiredArgsConstructor
public class AiProxyService {

    private final WebClient pythonWebClient;

    public String generateContent(AiGenerateRequestDto request) {
        return pythonWebClient.post()
                .uri("/ai/generate")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // Expecting the raw text response
    }

    public TranslateResponseDto translateText(String text, String destLang) {
        TranslateRequestDto requestBody = new TranslateRequestDto(text, destLang);

        return pythonWebClient.post()
                .uri("/api/translate/")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(TranslateResponseDto.class)
                .block(); // Wait for the response
    }
}
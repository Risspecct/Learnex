package users.rishik.Learnex.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import users.rishik.Learnex.Dtos.AiGenerateRequestDto;
import users.rishik.Learnex.Dtos.TranslateRequestDto;
import users.rishik.Learnex.Dtos.TranslateResponseDto;

@RequiredArgsConstructor
@Service
public class AiProxyService {

    private final WebClient pythonWebClient;

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 4000;

    public String generateContent(AiGenerateRequestDto request) {
        return callWithRetry("/ai/generate", request, String.class);
    }

    public TranslateResponseDto translateText(String text, String destLang) {
        TranslateRequestDto requestBody = new TranslateRequestDto(text, destLang);
        return callWithRetry("/api/translate/", requestBody, TranslateResponseDto.class);
    }

    private <T> T callWithRetry(String uri, Object body, Class<T> responseType) {

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                return pythonWebClient.post()
                        .uri(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(body)
                        .retrieve()
                        .bodyToMono(responseType)
                        .block();
            } catch (Exception ex) {

                if (attempt == MAX_RETRIES) {
                    throw ex;
                }

                try {
                    Thread.sleep(RETRY_DELAY_MS);
                } catch (InterruptedException ignored) {}
            }
        }

        return null;
    }
}

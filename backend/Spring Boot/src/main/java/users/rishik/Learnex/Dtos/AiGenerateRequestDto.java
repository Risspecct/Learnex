package users.rishik.Learnex.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiGenerateRequestDto {
    @NotBlank
    String topic;

    @NotBlank
    int grade_level;

    @NotBlank
    String subject;
}

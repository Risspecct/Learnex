package users.rishik.Learnex.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AiGenerateRequestDto {
    @NotBlank
    String topic;

    @NotNull
    int grade_level;

    @NotBlank
    String subject;
}
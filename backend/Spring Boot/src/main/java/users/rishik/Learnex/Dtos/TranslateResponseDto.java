package users.rishik.Learnex.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TranslateResponseDto {
    @NotBlank
    String translated_text;
}

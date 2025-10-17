from google.cloud import translate_v2 as translate

translate_client = translate.Client()


def translate_text(text: str, dest_lang: str) -> str:
    if isinstance(text, list):
        text = text[0]

    result = translate_client.translate(text, target_language=dest_lang)
    return result['translatedText']


if __name__ == "__main__":
    text_to_translate = "Hello, how are you?"
    target_language = "hi"
    translated = translate_text(text_to_translate, target_language)
    print(f'"{text_to_translate}" -> "{translated}"')

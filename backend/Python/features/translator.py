from googletrans import Translator
import asyncio

async def translate_text(text, dest_lang):
  translator = Translator()
  result = await translator.translate(text, dest=dest_lang)
  return result.text


if __name__ == "__main__":
  text = "Hello, how are you?"
  code = "hi"
  translated = asyncio.run(translate_text(text, code))
  print(translated)
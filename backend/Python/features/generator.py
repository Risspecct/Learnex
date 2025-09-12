from typing import Any
from pydantic import BaseModel
from . import ai_config

class GeneratorRequest(BaseModel):
    topic: str
    grade_level: int
    subject: str

prompt_template = """
You are an expert STEM educator designing engaging, age-appropriate explanations for students in rural India. Your goal is to make complex topics simple, visual, and relatable.

Topic: "{topic}"  
Grade Level: {grade_level}  
Subject: {subject}  
Language: English  
Tone: Friendly, clear, and curiosity-driven  
Constraints:  
- Use analogies from everyday rural life (e.g., farming, cooking, local tools)  
- Avoid jargon unless explained simply  
- Include one visual description or diagram idea  
- End with a short quiz (3 questions) to reinforce learning

Output Format:  
1. **Concept Overview**  
2. **Step-by-Step Explanation**  
3. **Real-Life Analogy**  
4. **Diagram Idea**  
"""

def generate_text(request: GeneratorRequest):
    """
    Generate text based on the input request using the Granite model.
    """
    
    # Format the prompt with details from the request
    prompt = prompt_template.format(
        topic=request.topic,
        grade_level=request.grade_level,
        subject=request.subject
    )
    
    response = ai_config.granite_model.generate_text(prompt)
    return response
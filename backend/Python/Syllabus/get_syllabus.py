# core_logic.py

import json
import argparse
from pathlib import Path

# The path is defined relative to this script's location, making it robust.
SYLLABUS_DIR = Path(__file__).parent

def get_syllabus_data(grade: int, subject: str) -> dict:
    """
    Finds and loads the syllabus JSON file for a given grade and subject.

    Args:
        grade (int): The class or grade level (e.g., 10, 12).
        subject (str): The name of the subject file (without the .json extension).

    Returns:
        dict: The syllabus data as a Python dictionary.

    Raises:
        FileNotFoundError: If the syllabus file cannot be found.
        json.JSONDecodeError: If the file is not a valid JSON.
    """
    file_path = SYLLABUS_DIR / str(grade) / f"{subject}.json"

    if not file_path.is_file():
        # Raise an error if the file doesn't exist. The main block will handle it.
        raise FileNotFoundError(f"Syllabus file not found at: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    return data

# This main block runs only when you execute the script directly from the terminal.
if __name__ == "__main__":
    # 1. Set up the argument parser to define what inputs we expect.
    parser = argparse.ArgumentParser(
        description="Fetch a syllabus from the local JSON files."
    )
    
    # 2. Define the 'grade' argument. It's a required integer.
    parser.add_argument(
        "grade", 
        type=int, 
        help="The grade or class level (e.g., 10)"
    )
    
    # 3. Define the 'subject' argument. It's a required string.
    parser.add_argument(
        "subject", 
        type=str, 
        help="The subject name (e.g., 'mathematics')"
    )

    # 4. Parse the arguments provided by the user in the terminal.
    args = parser.parse_args()

    # 5. Try to fetch the data and print the result.
    try:
        # Call the main function with the user's input
        syllabus = get_syllabus_data(grade=args.grade, subject=args.subject)
        
        # Print the resulting JSON to the console with nice formatting
        print(json.dumps(syllabus, indent=4))

    except FileNotFoundError as e:
        print(f"Error: {e}")
    except json.JSONDecodeError:
        print(f"Error: The syllabus file for {args.subject} is corrupted or not valid JSON.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
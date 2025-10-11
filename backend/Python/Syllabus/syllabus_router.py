from fastapi import APIRouter, HTTPException
from json import JSONDecodeError
from .get_syllabus import get_syllabus_data

# Create an APIRouter instance. We'll add our routes to this.
router = APIRouter()

@router.get("/{grade}/{subject}", tags=["Syllabus"])
def fetch_syllabus(grade: int, subject: str):
    """
    API endpoint to retrieve syllabus information for a specific grade and subject.
    Path parameters are used for required inputs.
    """
    try:
        # Call the core logic function to get the data
        syllabus_data = get_syllabus_data(grade=grade, subject=subject)
        return syllabus_data
    
    except FileNotFoundError:
        # If the file isn't found, raise a 404 error with a clear message.
        raise HTTPException(
            status_code=404, 
            detail=f"Syllabus for grade {grade}, subject '{subject}' not found."
        )
        
    except JSONDecodeError:
        # Handle cases of corrupted JSON files.
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse the syllabus file for '{subject}'. The file may be corrupted."
        )
        
    except Exception as e:
        # Catch any other unexpected errors.
        print(f"An unexpected server error occurred: {e}") # Log the error for debugging
        raise HTTPException(
            status_code=500, 
            detail="An internal server error occurred."
        )
export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("PhysicsGameDB", 1);
        
        request.onerror = (event) => {
            reject("Error opening database: " + event.target.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains('gameScores')) {
                const objectStore = db.createObjectStore("gameScores", { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("level", "level", { unique: false });
                objectStore.createIndex("timestamp", "timestamp", { unique: false });
            }
        };
        
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Function to save a game score
export async function saveGameScore(scoreData) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(["gameScores"], "readwrite");
        const objectStore = transaction.objectStore("gameScores");
        
        const data = {
            level: scoreData.level,
            score: scoreData.score,
            stars: scoreData.stars,
            timestamp: new Date().toISOString()
        };
        
        const request = objectStore.add(data);
        
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                console.log("Game score saved offline!");
                resolve();
            };
            
            request.onerror = (event) => {
                reject("Error saving score: " + event.target.error);
            };
        });
    } catch (error) {
        console.error("Failed to save score:", error);
    }
}

// Function to get all scores (for syncing later)
export async function getAllScores() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(["gameScores"], "readonly");
        const objectStore = transaction.objectStore("gameScores");
        const request = objectStore.getAll();
        
        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            
            request.onerror = (event) => {
                reject("Error loading scores: " + event.target.error);
            };
        });
    } catch (error) {
        console.error("Failed to load scores:", error);
        return [];
    }
}

// Function to clear all scores (for testing)
export async function clearAllScores() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(["gameScores"], "readwrite");
        const objectStore = transaction.objectStore("gameScores");
        const request = objectStore.clear();
        
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                console.log("All scores cleared!");
                resolve();
            };
            
            request.onerror = (event) => {
                reject("Error clearing scores: " + event.target.error);
            };
        });
    } catch (error) {
        console.error("Failed to clear scores:", error);
    }
}

// ✅ DEBUG PANEL: Add this function to view saved scores
export function setupDebugPanel() {
    // Create debug button
    const debugBtn = document.createElement('button');
    debugBtn.textContent = '📊 Show Saved Scores';
    debugBtn.style.position = 'absolute';
    debugBtn.style.top = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '10000';
    debugBtn.style.padding = '10px';
    debugBtn.style.background = '#2c3e50';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.borderRadius = '5px';
    debugBtn.style.cursor = 'pointer';
    debugBtn.style.fontFamily = 'Arial, sans-serif';
    debugBtn.style.fontSize = '14px';
    
    // Create score display area
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'scoreDebug';
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '50px';
    scoreDisplay.style.right = '10px';
    scoreDisplay.style.background = 'rgba(0,0,0,0.9)';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.padding = '15px';
    scoreDisplay.style.borderRadius = '8px';
    scoreDisplay.style.maxWidth = '350px';
    scoreDisplay.style.maxHeight = '400px';
    scoreDisplay.style.overflowY = 'auto';
    scoreDisplay.style.display = 'none';
    scoreDisplay.style.fontFamily = 'Arial, sans-serif';
    scoreDisplay.style.fontSize = '14px';
    scoreDisplay.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    scoreDisplay.style.border = '2px solid #3498db';
    
    document.body.appendChild(debugBtn);
    document.body.appendChild(scoreDisplay);
    
    // Toggle score display on button click
    debugBtn.addEventListener('click', async () => {
        try {
            const scores = await getAllScores();
            const display = document.getElementById('scoreDebug');
            
            if (display.style.display === 'none') {
                let html = '<h3 style="margin: 0 0 15px 0; color: #3498db; text-align: center;">📋 Saved Scores (Offline)</h3>';
                
                if (scores.length === 0) {
                    html += '<p style="text-align: center; color: #aaa;">No scores saved yet.</p>';
                } else {
                    scores.forEach(score => {
                        html += `
                        <div style="background: rgba(255,255,255,0.1); padding: 10px; margin: 8px 0; border-radius: 5px; border-left: 4px solid #3498db;">
                            <strong>Level ${score.level}</strong><br>
                            Score: ${score.score} pts | Stars: ${'⭐'.repeat(score.stars)}<br>
                            <small style="color: #aaa;">${new Date(score.timestamp).toLocaleString()}</small>
                        </div>`;
                    });
                    
                    html += `<br><button id="clearScoresBtn" style="padding: 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; width: 100%; cursor: pointer;">Clear All Scores</button>`;
                }
                
                display.innerHTML = html;
                display.style.display = 'block';
                
                // Add clear button functionality
                const clearBtn = document.getElementById('clearScoresBtn');
                if (clearBtn) {
                    clearBtn.addEventListener('click', async () => {
                        if (confirm('Are you sure you want to delete ALL saved scores?')) {
                            await clearAllScores();
                            display.innerHTML = '<p style="text-align: center; color: #aaa;">All scores cleared!</p>';
                            setTimeout(() => {
                                display.style.display = 'none';
                            }, 1500);
                        }
                    });
                }
            } else {
                display.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading scores:', error);
        }
    });
}

// ✅ Initialize the debug panel when the module loads
setupDebugPanel();
import { getAllScores, clearAllScores } from './phaser/offlineDb';
import { syncScores } from './apiService';

export const triggerSync = async () => {
  console.log('Sync Service: Attempting to trigger sync...'); // 1. Log entry

  if (!navigator.onLine) {
    console.log('Sync Service: Offline, skipping sync.');
    return;
  }

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.log('Sync Service: Not logged in, skipping sync.');
    return;
  }

  try {
    const scoresToSync = await getAllScores();
    console.log('Sync Service: Found scores in IndexedDB:', scoresToSync); // 2. Log found scores

    if (scoresToSync.length === 0) {
      console.log('Sync Service: No scores to sync. Exiting.'); // 3. Log the silent exit
      return;
    }

    console.log(`Sync Service: Syncing ${scoresToSync.length} scores...`);
    await syncScores(scoresToSync); // This is where the API call is made

    console.log('Sync Service: Sync successful, clearing local scores.');
    await clearAllScores();

  } catch (error) {
    console.error('Sync Service: Failed to sync scores:', error);
  }
};
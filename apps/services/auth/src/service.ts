import { pg } from '../../db';

// Gets all the activities user has completed
export async function getUserActivities(username) {
    const activities = pg('activity');
    const userActivites = await activities.where({ username }).select('id');
    return userActivites;
}

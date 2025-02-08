import { pg } from '../../db';

// Adds the activity to the Activity table, setting it as completed
export async function setIsCompleted(
    id: string,
    username: string
): Promise<void> {
    const activity = pg('activity');
    await activity.insert({ id, username, completedon: new Date() });
}

// Gets the activity
export async function getActivity(id: string, username: string) {
    const activity = pg('activity');
    const newActivity = await activity
        .where({ username })
        .andWhere({ id })
        .select();
    return { ...newActivity[0], completedOn: newActivity[0].completedon };
}

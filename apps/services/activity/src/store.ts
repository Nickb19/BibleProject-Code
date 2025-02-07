import { pg } from '../../db';
export async function setIsCompleted(
    id: string,
    username: string
): Promise<void> {
    const activity = pg('Activity');
    await activity.insert({ id, username, completedOn: new Date() });
}

export async function getActivity(id: string, username: string) {
    const activity = pg('Activity');
    const newActivity = await activity
        .where({ username })
        .andWhere({ id })
        .select();
    return newActivity[0];
}

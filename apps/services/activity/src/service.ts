import { pg } from '../../db';
export async function setIsCompleted(
    id: string,
    username: string
): Promise<void> {
    const activity = pg('activity');
    await activity.insert({ id, username, completedon: new Date() });
}

export async function getActivity(id: string, username: string) {
    const activity = pg('activity');
    const newActivity = await activity
        .where({ username })
        .andWhere({ id })
        .select();
    return { ...newActivity[0], completedOn: newActivity[0].completedon };
}

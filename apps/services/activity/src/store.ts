import { pg } from '../../db';
export async function setIsCompleted(id: string): Promise<void> {
    console.log('SET COMPLETED IN DATABASE', id);

    const activity = pg('Activity');
    // grab user
    // add the activity
    // add that it is completed
    await activity.update({ completedOn: new Date() }).where('id', id);
}

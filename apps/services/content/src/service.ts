import { pg } from '../../db';

interface Article {
    id: string;
    title: string;
    image: string;
    quizId: number;
    description: string;
    slug: string;
}
export async function getArticles(): Promise<Article[]> {
    const activity = pg('articles');
    const allArticles = await activity.select();
    return allArticles;
}

export async function getArticle(slug: string): Promise<Article> {
    const activity = pg('articles');
    const article = await activity.where({ slug }).select();

    return { ...article[0], quizId: article[0].quizid };
}

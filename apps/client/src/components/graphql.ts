import { gql } from '@apollo/client';

export const ActivityCompleted = gql`
    mutation ActivityCompleted($articleId: ID) {
        ActivityCompleted(articleId: $articleId)
    }
`;

export const GetArticle = gql`
    query Article($slug: String) {
        article(slug: $slug) {
            id
            title
            image
            quizId
            completedOn
        }
    }
`;

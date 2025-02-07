import { gql } from '@apollo/client';

export const ActivityCompleted = gql`
    mutation ActivityCompleted($articleId: ID, $username: String) {
        ActivityCompleted(articleId: $articleId, username: $username)
    }
`;

export const GetActivity = gql`
    query Activity($articleId: ID, $username: String) {
        getActivity(articleId: $articleId, username: $username) {
            completedOn
            article {
                id
            }
            user {
                username
            }
        }
    }
`;

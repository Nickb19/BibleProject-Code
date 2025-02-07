import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { ActivityCompleted } from './graphql';

import { QuizItem } from './QuizItem';

const QuizContainer = styled.div`
    margin: 24px 0;
    max-width: 560px;

    h2 {
        margin-bottom: 12px;
    }

    div {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 8px;
    }
`;

export const Quiz = ({ id, articleId }) => {
    const [mutateActivity] = useMutation(ActivityCompleted);

    const { data } = useQuery(
        gql`
            query Quiz($id: ID!) {
                quizById(id: $id) {
                    id
                    title
                    questions {
                        id
                        questionText
                    }
                }
            }
        `,
        {
            variables: {
                id,
            },
        }
    );

    const onSelect = (articleId) => {
        // Use mutation here to show that they completed the article
        mutateActivity({ variables: { articleId } });
        // TODO: wire this up to Activity
    };

    return (
        <QuizContainer id="quiz">
            <h2>{data?.quizById.title}</h2>
            <div>
                {data?.quizById.questions.map((question, idx) => (
                    <QuizItem
                        index={idx}
                        question={question.questionText}
                        id={question.id}
                        articleId={articleId}
                        onClick={onSelect}
                    />
                ))}
            </div>
        </QuizContainer>
    );
};

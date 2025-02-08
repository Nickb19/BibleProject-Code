import React, { useState } from 'react';
import { useUser } from '../providers/Auth';
import { gql, useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { ActivityCompleted, GetActivity } from './graphql';
import { AllContent } from '../routes/Home';
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
    // Grabs the completed data and checks to see if this task has been completed or not
    const { username } = useUser();
    const { data: completedData } = useQuery(
        gql`
            query GetCompleted {
                getUserActivities(username: $username) {
                    activities {
                        id
                    }
                }
            }
        `,
        { variables: { username } }
    );
    const completedActivities =
        completedData?.getUserActivities?.activities.map((m) => m.id);
    const isComplete = !!completedActivities?.find((m) => m === articleId);
    const [mutateActivity] = useMutation(ActivityCompleted);
    const [completed, setCompleted] = useState(isComplete);
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
    const onSelect = (articleId: string, username: string) => {
        // Use mutation here to show that they completed the task
        mutateActivity({
            variables: { articleId, username },
            refetchQueries: [GetActivity, AllContent],
            onCompleted: () => setCompleted(true),
        });
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
                        completed={completed}
                    />
                ))}
            </div>
        </QuizContainer>
    );
};

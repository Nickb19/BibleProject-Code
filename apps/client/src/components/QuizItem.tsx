import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { useUser } from '../providers/Auth';

const Letter = styled.span`
    padding: 8px 12px;
    border: 1px solid #efefef;
    display: block;
    background: #fff;
    color: #0c0c0e;
    border-radius: 4px;
`;

export const QuizItem = ({
    index,
    question,
    id,
    articleId,
    onClick,
    completed,
}: {
    index: number;
    question: string;
    id: string;
    articleId: string;
    onClick: (articleId: string, username: string) => void;
    completed: boolean;
}) => {
    const user = useUser();
    return (
        <Button
            style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #c9c9c9',
                appearance: 'none',
                background: '#161718',
                fontSize: '18px',
                textAlign: 'left',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                cursor: completed ? 'inherit' : 'pointer',
            }}
            disabled={completed}
            id={id}
            onClick={(e) => {
                e.preventDefault();
                if (completed) return;
                return onClick(articleId, user.username);
            }}
        >
            <Letter>{String.fromCharCode(65 + index)}</Letter>
            <span>{question}</span>
        </Button>
    );
};

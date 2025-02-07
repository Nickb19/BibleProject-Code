import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useUser } from '../providers/Auth';

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #c9c9c9;
    appearance: none;
    background: #161718;
    cursor: pointer;
    font-size: 18px;
    text-align: left;
    display: flex;
    gap: 12px;
    align-items: center;

    &:active {
        background: #ff009d;
    }
`;

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
}: {
    index: number;
    question: string;
    id: string;
    articleId: string;
    onClick: (articleId: string, username: string) => void;
}) => {
    const user = useUser();
    return (
        <Button
            id={id}
            onClick={(e) => {
                e.preventDefault();
                return onClick(articleId, user.username);
            }}
        >
            <Letter>{String.fromCharCode(65 + index)}</Letter>
            <span>{question}</span>
        </Button>
    );
};

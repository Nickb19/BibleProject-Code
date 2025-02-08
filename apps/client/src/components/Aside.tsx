import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GetActivity } from './graphql';
import { useUser } from '../providers/Auth';
import { format } from 'date-fns';
import styled from 'styled-components';
import { CheckCircle } from '@phosphor-icons/react';

const AsideWrapper = styled.aside`
    width: 100%;
    border: 2px solid #efefef;
    border-radius: 8px;
    padding: 12px;

    ul {
        list-style: none;
        display: grid;
        grid-gap: 12px;
        font-weight: 600;
        font-size: 14px;
    }

    ul a {
        color: #c8c8c8;
    }

    ul a:hover {
        color: #fff;
    }

    h2 {
        font-size: 14px;
        margin: 0 0 8px;
        color: #ff009d;

        &:not(:first-child) {
            margin-top: 12px;
        }

        &::after {
            content: '';
            display: block;
            width: 149px;
            height: 2px;
            background: #686868;
            margin-top: 8px;
        }
    }
`;

const ActivityBar = styled.span`
    display: grid;
    grid-template-columns: minmax(0, max-content) 1fr;
    grid-gap: 8px;
    background: #00ce7a;
    color: #0c0c0e;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
`;

const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export const Aside = ({ id, children }) => {
    const [activity, setActivity] = useState(null);
    const [show, setShow] = useState(false);
    // Gets activity from the user
    const user = useUser();
    useQuery(GetActivity, {
        variables: { articleId: id, username: user.username },
        onCompleted(data) {
            setActivity(data);
            if (data?.getActivity) setShow(true);
        },
        fetchPolicy: 'cache-and-network',
    });

    const activityCompletionDate = activity?.getActivity?.completedOn;
    return (
        <AsideWrapper>
            {show && (
                <ActivityBar>
                    <CheckCircle weight="bold" color="#0c0c0e" size={24} />
                    Completed on {format(activityCompletionDate, 'MM/dd/yyyy')}
                </ActivityBar>
            )}
            {children}
        </AsideWrapper>
    );
};

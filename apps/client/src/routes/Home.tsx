import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { useUser } from '../providers/Auth';
import { Wrapper } from '../components/Wrapper';
import { Card } from '../components/Card';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 48px;
    margin: 16px 0 56px;
`;

// Stripped this out so I can recall it later after my mutation

export const AllContent = gql`
    query AllContent($username: String!) {
        articles {
            id
            title
            image
            slug
            description
        }
        videos {
            id
            title
            description
            slug
            image
        }
        quizzes {
            id
            title
        }
        getUserActivities(username: $username) {
            activities {
                id
            }
        }
    }
`;

export const Home = () => {
    const { username } = useUser();
    const ActivityBar = styled.span`
        display: grid;
        grid-template-columns: minmax(0, max-content) 1fr;
        grid-gap: 8px;
        background: #00ce7a;
        color: #0c0c0e;
        align-items: center;
        text-align: center;
        padding: 8px;
        border-radius: 4px;
    `;
    const { data, loading } = useQuery(AllContent, {
        variables: { username },
        fetchPolicy: 'cache-and-network',
    });
    // Gets the total trainings and how many activities the user has completed
    const totalTrainings = data?.articles.length + data?.videos.length;
    const userActivities = data?.getUserActivities?.activities;
    return loading ? (
        <div>Loading...</div>
    ) : (
        <Wrapper>
            <ActivityBar>
                {userActivities.length}/ {totalTrainings} Trainings Completed!!
            </ActivityBar>
            <h2>Articles</h2>
            <Grid>
                {data?.articles.map((article) => (
                    <Card {...article} type="article" key={article.id} />
                ))}
            </Grid>
            <h2>Videos</h2>
            <Grid>
                {data?.videos.map((video) => (
                    <Card {...video} type="video" key={video.id} />
                ))}
            </Grid>
        </Wrapper>
    );
};

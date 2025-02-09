Assuming you have docker desktop installed, the docker compose will run normally
by using the following command:

```bash
docker compose up -d
```

This allows the tables articles and activity table to be created

## Added Service: Activity

-   Added two endpoints: Mutation named ActivityCompleted and getActivity
-   getActivity an activity based upon the id and username
-   ActivityCompleted sets the activity to completed when the user clicks a quiz
    item. The user completes the activity when they finish the quiz
-   The type activity is an entity that is currently shared with the auth
    service

## Updated Services: Auth and Content

### Content

-   Stripped out the articles and placed data in database
-   Would recommend the same with videos and quizzes

### Auth

-   Added endpoint getUserActivities - this get all of the user's completed
    activities
-   Uses the shared entity activity, uses this entity to retrieve all of the
    user's completed activities without having to create a new activity type

## Desired Functionality: Bookmarking

-   Due to time constraints, I did not get to implement bookmarking
    functionality, but here is how I would implement it

### Update Service: Auth and Activity

-   There are two ways we could accomplish this, either sort it out in the
    frontend or separate these two in the backend
-   I would prefer separating this out in the backend because the data would be
    better organized, meaning we know that we are retrieving either the
    bookmarked activities or the completed activities
-   I would first add a new column to the activity database called
    "bookmarkedOn." This is how we will keep track if an activity is bookmarked
    or not
-   I would then add a new endpoints to the activity service: setBookmarked
-   The setBookmarked endpoint will insert the record into the database with a
    "bookmarkedOn" date when the user bookmarks the activity
-   On the user's completion of the activity, I would then check if the record
    exists as a bookmark, if it does, the I would update the "completedOn" data
    and set the "bookmarkedOn" data to null, because it no longer needs to be
    bookmarked if it is completed. If it is not bookmarked and the user
    completes it, then we would add a new record into the database with the
    completedOn date.
-   To the auth service, I would add a "getBookmarkedActivities" and rename the
    getUserActivities to "getCompletedActivities"
-   The getBookmarkedActivities will get the user's bookmarked activities

### The GetActivity Endpoint For adding bookmarked funcitonality

-   This will remain the same, it will get the desired activity and return both
    the completedOn and bookmarkedOn data fields
-   This is because in this situation, it would be easier to sort out on the
    frontend whether or not it is completed or bookmarked for one item, instead
    of creating a more complex sql statement
-   This will check whether it is completed or bookmarked, and show the
    appropriate message, if applicable

## Frontend Updates

-   Added mutation for the endpoint ActivityCompleted after the user selects a
    quiz item
-   Disabled the button after onClick so the user cannot complete the activity
    again
-   Added datefns for formatting the completedOn data
-   Added query to get desired activity
-   Updated logic to show whether or not the activity has been completed

## Deployment

-   Use AWS RDS to store the postgres table
-   Use EKS and terraform to deploy the api services

## Added Tools:

-   Postgres table - to store data relating to activities
-   Knex - establishes a connection to the database and builds query statements
-   date-fns - date formatter
-   reactstrap: react library that supplies components
-   docker-compose: For local development creating postgres image and database

### Started auth separately

-   I was running into an issue where when I ran npm run start, it would not
    start the auth-services subgraph, so I decided to start that on its own,
    that is why I have the "start:auth" script

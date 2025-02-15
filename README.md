# Kit Platform (Take-Root Project)

Thank you for taking the time to interview with the Platform Squad at
BibleProject! In this project, you'll be presented with a fictional scenario for
an e-learning company and be asked to design and implement a software solution
for one of the company's new business initiatives. (The scenario is very similar
to one we actually face at BibleProject, but we've changed some of the details
to encourage you to feel free to be creative and not be overly constrained by
the work we've already done.)

## Please Note

Please read the readme in the activity-e2e folder, it will explain that the
articles are stripped out and in a database, you must have docker installed and
run the docker-compose to create the articles table with the articles uploaded
to it

## Scenario

Suppose you work for an e-learning SaaS company called _Kit_. Kit provides
corporate training for small and medium businesses around the world (90% of them
are in the United States). Employees of your corporate clients are assigned
training in the form of videos to watch, articles to read, and quizzes to fill
out, and your software platform provides on-demand access to these resources and
tracks user progress. Clients may supply their own videos and other resources,
or they may choose from a stock set of resources maintained by your company.

There are several teams at your company who work together to support the
product. Three in particular are relevant to this case study: (1) Content and
Integrations, who support curation of the content library as well as integrating
customer content into the system, (2) Web, who supports the frontend Web
application with which users interface, and (3) Platform, who supports the
application backend and infrastructure.

You are a software engineer on the Platform team, a squad that is growing and
taking on more responsibility as the organization looks to scale up, implement
innovative new training resources, and expand its global reach.

One of your team's projects for this quarter is to modernize the product's user
activity/progress tracking system. Currently the application is deployed as a
monolithic Web app which tracks a user's progress by maintaining a JSON file for
each user, an architecture which is problematic for several reasons.

Additionally, a new team is forming within your organization to create a mobile
version of the Web product, which will allow users to access training on a
smartphone or tablet, and it is a business requirement that user progress be
synchronized across platforms (Web, Android, iOS, etc.).

The goal is for the Platform team to create a backend User Activity service with
a GraphQL API so that the Web team can migrate their code and data to the new
GraphQL service, and so that any new mobile apps can use the same GraphQL API as
the Web and share a unified store of user data and progress.

For this exercise, you will implement one or more GraphQL services within an
Apollo Federation supergraph which provide an API for tracking users' activity
and progress on their corporate training.

For the sake of simplicity, assume that relationships between training material
(audio, video, interactive lessons, etc.) are flat - meaning you don't need to
deal with resources that contain other resources. A user has a relationship with
a resource. Your system tracks the progress of that relationship, including it's
progress, completion state, and whether the user has bookmarked the resource.

This repo represents scaffolding into which your new services should be written
(more details in the sections below).

Your focus should be on the GraphQL API, Node.js backend application layer, data
stores, and other distributed system components as needed. You need not provide
a fully production-worthy ready-to-deploy solution---use mocks and fakes as
appropriate---but you should provide working code for the most essential parts
of the application and be prepared to explain the proposed architecture in
depth. Our goal is for this endeavor to be a conversation, not an exam.

## Repository Setup

This is an [Nx](https://nx.dev/) monorepo with an
[Apollo Federation](https://www.apollographql.com/docs/federation/) federated
GraphQL API.

To get you started, the graph currently has three rudimentary services, which
can be found in the `apps/` folder:

-   `gateway`: An Apollo Gateway that serves as the router for the federated
    graph (note we are not using the newer Apollo Router yet)
-   `services/auth`: A subgraph for authentication concerns
-   `services/content`: A subgraph for training content concerns

There is also a library `libs/user-access` which stubs out user authentication
calls - in the real system this would make calls to a provider like Firebase,
but integrating with Firebase is not really the main point of this exercise, so
you should feel free to leave those calls stubbed out, although you may end up
needing to create some new API methods for the library to expand the user access
functionality.

You can run and experiment with the supergraph by installing the dependencies
(`npm i`; Node.js 20 is recommended) and executing the following commands in two
separate terminal windows (the Gateway is a bit of a prima dona and has to run
separately):

-   `cp .env.example .env` (**Don't skip this step!**)
-   `npm run start`
-   `npm run start:gateway`

Then navigate to http://localhost:6050 to query your supergraph.

Finding a better way to serve everything with a single command is left as an
exercise.

> **Heads up**: When you add a new service, you will need to update the
> `--projects` flag in the npm start command to include your new service.

## Task

**Your task is to build out one or more new subgraphs that handle User
Progress/User Activity concerns as described in the problem statement and
integrate them into the supergraph and monorepo structure.**

Considerations include but are not limited to: federated entities, backend data
stores, REST API data sources, user data handling, and performance and
reliability. You need not go as far as actually deploying third party resources
(e.g. AWS RDS instances) - use mocks and fakes as appropriate - but your code
should run and you should be prepared to describe how the production environment
would be architected and deployed. Stellar solutions to this problem may include
Docker Compose stacks or other locally emulated cloud resources.

Please include along with your solution a brief writeup of design considerations
that aren't obvious from your code but would impact the production
implementation of this system in a real-life scenario. This may include but is
not limited to - key application modules, databases, caching, deployment,
monitoring, etc. Bullet points are fine, and diagrams are welcome if there's
anything you think is better expressed visually.

Because this is an open-ended challenge, there are many more things you could do
than you'll have time for. When considering how to use your time, here are some
things to keep in mind:

-   When implementing your solution, prefer depth over breadth. A small number
    of key queries/mutations implemented more holistically gives us better
    insight into your abilities than implementing a large number of resolvers
    that mock everything out.
-   For features you don't have time to implement, feel free to simply write
    comments for anything you think would give us better insight into your
    understanding of the problem and potential implemenation - GraphQL schema,
    notes on the resolver implementation, database schema, etc.
-   Where relevant, show your understanding of key GraphQL concepts (for
    example, implementing entity federation)
-   Leave some time to consider the big picture for your writeup. While we want
    to know that you can write code, we also care about your holistic approach
    to implementing a production system. We'll dig into this more during the
    interview.
-   If you're stuck on something, don't let it consume too much time. Feel free
    to leave a note with your solution and during the interview we can discuss
    what you were hoping to do.

## Development Notes

-   Nx regards the name of, say, the Auth service as `services-auth` (i.e.
    instead of just `auth` or `services/auth`).
-   A shortcut for creating a new subgraph service is to use the `@nx/node:app`
    generator to create a new service in `apps` (some default options for this
    command have already been set for you under "generators" in the nx.json
    file):

    ```sh
    npx nx g @nx/node:app --directory apps/services/myservice services-myservice
    ```

    > **Note**: There is an
    > [outstanding issue](https://github.com/nrwl/nx/issues/19199) that produces
    > an error log on hot reloads when the webpack build target is run with the
    > option `generatePackageJson: true`, which the generator includes in the
    > generated service's project.json file. The application still reloads
    > successfully, but if you'd like to remove the error you can simply delete
    > `generatePackageJson: true` from the webpack build target options as it
    > won't be needed to run your service.

-   In a similar vein, a new library can be generated using:

    ```sh
    npx nx g @nx/node:lib
    ```

-   You may notice that this monorepo is not using the latest version of Nx.
    Upgrading the dependencies is allowed and even encouraged! Just be prepared
    to explain the changes.
-   If you notice caching issues you can run `npx nx reset` to clear the Nx
    cache.

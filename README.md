# StudyDash
Setup instructions below final report.

## Application Description
StudyDash aims to enhance the day-to-day learning 
process by providing a dashboard of productivity tools 
that encourages the building of mastery through 
repeated, deliberate practice. These tools include a 
customizable Pomodoro timer, TODO list, habit tracker, 
Gantt chart, and spaced-repetition flashcard reviewer. 
Users are also able to create chat groups with one 
another to facilitate shared learning and communication.

## Goals

### Minimal Goals
1. ✅ A flashcard reviewer supporting user CRUD (creation, reading, updating, and deleting) of flashcard modules (collections of flashcards) and the fronts and backs of the flashcards themselves.
2. ✅ A TODO list supporting user CRUD of TODO tasks. 
3. ✅ A daily habits tracker supporting user CRUD of daily habits and their completion. 
4. ✅ A customizable Pomodoro timer with adjustable Pomodoro (focus session), short break, and long break durations.

### Standard Goals
1. ✅ A heatmap visualization of daily habit completion. 
2. ✅ Application of a spaced repetition algorithm for flashcards which provides time-based recommendations for review based on user rating of their understanding of a flashcard (i.e. low ratings mean the flashcard is recommended sooner). 
3. ✅ Login authentication for users including profile creation (i.e. profile picture, username, etc.)
4. ✅ A calendar view of when TODO tasks have been scheduled. 
5. ✅ A Gantt chart (project time management chart) for TODO tasks and daily habits.

### Stretch Goals
1. ✅ User chat groups for users to communicate with each other. 
2. ❌ Ability for users to share application data with other users (e.g. share flashcards, TODO tasks, etc.)
3. ❌ Gamification of application functionalities (e.g. minigames involving flashcard review, habit completion, etc.)

## Description of Tech Usage

### HTML, CSS, JS
HTML is used in the application in order to declare the 
structure of React components and pages, direct styling 
through class names, facilitate script execution 
through id assignment, etc. CSS and CSS frameworks are 
used to declare the styling for the entire application 
(e.g. aesthetic placement of UI elements, visual 
styling, coloring, etc.) JS (JavaScript) is the 
language used extensively throughout the project in 
order to declare the scripts and logic which 
facilitate the functionality of the entire 
application (e.g. asynchronous API calling, 
toggling the visibility of elements, database 
CRUD, etc.)

### React and Redux
React is used in virtually all the application’s 
visual elements as most, if not all, are functional 
React components which make use of React paradigms 
such as re-rendering only certain components, as 
opposed to the entire page, on state change (e.g. 
when certain data has changed, when settings have 
changed, etc.) Redux is used extensively throughout 
the project as Redux thunks are used to asynchronously 
fetch data from APIs and the Redux store is used to 
store the general state of the application across 
React components. This allows, for example, for data 
sharing across components; avoiding simultaneous, 
identical API calls for the same data.

### Node and Express
Node is used extensively throughout the project as 
it is the back-end, server environment used by 
StudyDash. Compared to something like a .NET Core 
server, Node is asynchronous and better suited for 
scalable applications which are designed to be fast, 
lightweight, and require two-way communication 
between server and client: like StudyDash! Express 
is used extensively throughout the project as it 
manages the backend API routing, requests, and 
responses through which nearly all CRUD in StudyDash 
operates.

### MongoDB
MongoDB is used in the project as the database which 
stores all data that needs to persist (e.g. TODO 
tasks, daily habits, flashcards, etc.) Compared to 
SQL databases, NoSQL databases like MongoDB suit 
StudyDash well as the use cases for certain 
functionalities are frequently expanding, resulting 
in a similarly frequent change in data schemas. Such 
schema changes would be difficult to handle in SQL 
databases, which are typically more rigidly structured.

### Builds and Deployment
StudyDash uses a service/technology presented in this 
unit, Render, for building its front and backends and 
deploying them as a static site and web service 
respectively. This allows for our application to be 
used at the URL it has been deployed to (as opposed to 
running it locally from code): complete with 
communication with the application’s backend and a 
database. Compared to other services which offer web 
service and static site deployment, Render is 
relatively easy to use and, perhaps most importantly, 
free for our use case.

## Above and Beyond Functionality
StudyDash has gone above and beyond in multiple 
categories. Of note is that the application features 
a particularly complex piece of technology — live user 
chat — that uses Socket.IO and Firebase for sending 
in-app and desktop notifications. Research on a 
complex spaced repetition algorithm was also done 
to expand on the user experience for flashcard review. 
The dates used in flashcard, habit, and TODO modules 
also change according to user timezone.

## Next Steps
Expanding on the chat functionality with our second 
stretch goal (sharing of user assets) would definitely 
be on the list of next steps as it currently exists in 
a vacuum with little relation to the rest of the 
application (not to mention that users likely have 
other preferred methods of contacting each other, and 
allowing sharing of in-app assets would provide an 
incentive to use our chat). Our third stretch goal, 
gamification, would also be a good next step as well 
given that it would augment the learning experience by 
making it more enjoyable (and perhaps provide a more 
unique incentive to use the application compared to 
other productivity tool services). Aside from 
completing our remaining stretch goals, adding more 
productivity tools to the application would be prudent 
as the application, by virtue of its name, is designed 
to be a unified hub (dashboard) of many tools that aid 
in studying.

## Contributions

### Annabelle
Annabelle completed the setup of virtually all major 
infrastructural aspects of the project including the 
initial repo (complete with a working copy of her UI 
proposal), Redux thunks and store, MongoDB connection, 
and deployment of the application’s front and back-ends 
through Render. In terms of functionality, she was 
responsible for, and implemented, user profile 
creation, user login authentication, the login screen, 
and the customizable Pomodoro timer. She also 
collaborated with Kush to implement user chat groups.

### Kush
Kush was responsible for, and implemented, the 
flashcard reviewer and its subsequent usage of a 
spaced repetition algorithm and in-app/desktop 
notifications for chat group messages and invites. 
He also collaborated with Annabelle to implement user 
chat groups.

### Peter
Peter was responsible for, and implemented, the 
TODO list and its accompanying calendar view. He also 
helped record the tasks that needed to be done for 
the coming iteration.

### Alan
Alan was responsible for, and implemented, the daily 
habits tracker and its accompanying heatmap of habit 
completion. He also wrote the initial pitch/description 
and drew up the initial mockup for the overall 
application during the ideation phase.

### Kenneth
Kenneth was responsible for, and implemented, the 
Gantt Chart and its integrations with the TODO list 
and habit functionalities. He was also responsible for 
writing the final report and documentation, recording 
meeting minutes, and directing/establishing the agenda 
for meetings.

## Setup
Create a `.env` file in `./server` with the following information:

```
MONGO_ATLAS_URL="<MONGO_DB-URL>"
PORT =8080
NODE_ENV ="development"
BASE_CLIENT_URL="http://localhost:3000"
BASE_SERVER_URL="http://localhost:8080"
```

and place the `firebase.json` file, which can be found in our
[Canvas group (PAKKA) files](https://canvas.ubc.ca/groups/539137/files),
in `./server` as well.

The site will also require notification browser permissions
for chat notifications to work (though you will be prompted to enable them
in-app).

## Initial Project Proposal

### Project Description

The study application is for learners seeking to build
mastery through deliberate practice by allowing users
to set abstract goals which are associated with habits
or tasks on a TODO list. The application will store user
goals, habits, TODO lists, user statistics, and flashcards.
Users will be able to use stored goals, habits, and TODO
lists as previously discussed and user statistics to
evaluate their progress and go through flashcards to
review concepts. Some additional functionality to add
or remove based on time constraints include allowing
users to chat with each other, allowing users to form
groups and share in-app resources, and adding gamification
to make the learning experience more engaging.

### Project Task Requirements

#### 3-5 Minimal Requirements (Will Definitely Complete)

- Flashcards
- TODO list
- Habits Tracker
- Customizable Timer
  - Pomodoro setting with adjustable timers for breaks and
    study sessions

#### 3-7 "Standard" Requirements (Will Most Likely Complete)

- Use d3.js to create visualizations for habit data
- Apply spaced repetition algorithm (flashcard appearance in
  deck frequency) to flashcards
- Login Authentication for users
- Calendar view of TODO list
- Gantt Chart
  - One bar for each habit/goal

#### 2-3 Stretch Requirements

- Allow users to be able to chat to each other
- Allow users to be able to form groups and gain same access
  to data
- Add gamification to make the learning experience more
  enjoyable/engaging

### Two Minimal Requirements Broken Down into ~2-5 Smaller Tasks

- Flashcards
  - Create the functionality of flipping over flashcard on click
  - Allow users to go through a flashcard deck, moving from
    one card to another when needed
  - Allow users to create flashcard decks
  - Allow users to create flashcards, one side for prompt and
    other for answer
  - Allow users to view all their created flashcards
  - Allow users to edit their flashcards
  - Allow users to delete selected flashcards
- Customizable Timer
  - Create timer frontend appearance(s)
  - Implement base Pomodoro timer functionality
  - Add customizable break length, study session length, and
    break frequency to Pomodoro timer
  - Implement timer type switching
  - Implement other timer types

### UI Mock Design

![Dashboard Design.jpg](docs%2FDashboard%20Design.jpg)

### Rough Sketches

#### Diagram of home page user interface of application

![Dashboard Sketch.jpg](docs%2FDashboard%20Sketch.jpg)

#### Diagram showing user interface of flash card section

![Flashcard Sketch.png](docs%2FFlashcard%20Sketch.png)

# Crediting

- [Update every minute clock used in GanttChart.jsx](https://stackoverflow.com/a/23450004)
- [Login Authentication Code Snippets](https://www.bezkoder.com/node-js-express-login-mongodb/#Create_Nodejs_Login_with_MongoDB_App)

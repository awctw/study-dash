# StudyDash

## Project Description
StudyDash aims to enhance the day-to-day learning 
process by providing a dashboard of productivity 
tools that encourages the building of mastery through 
repeated, deliberate practice. These tools include a 
customizable Pomodoro timer, TODO list, habit tracker, 
Gantt chart, and spaced-repetition flashcard reviewer. 
Users are also able to create chat groups with one 
another to facilitate shared learning and communication.

## Initial Project Description

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

## Setup

Please create a `db.config.js` file containing the MongoDB url.

```
module.exports = {
  url: <MONGO_DB-URL>
};
```

## Project Task Requirements

### 3-5 Minimal Requirements (Will Definitely Complete)

- Flashcards
- TODO list
- Habits Tracker
- Customizable Timer
  - Pomodoro setting with adjustable timers for breaks and
    study sessions

### 3-7 "Standard" Requirements (Will Most Likely Complete)

- Use d3.js to create visualizations for habit data
- Apply spaced repetition algorithm (flashcard appearance in
  deck frequency) to flashcards
- Login Authentication for users
- Calendar view of TODO list
- Gantt Chart
  - One bar for each habit/goal

### 2-3 Stretch Requirements

- Allow users to be able to chat to each other
- Allow users to be able to form groups and gain same access
  to data
- Add gamification to make the learning experience more
  enjoyable/engaging

## Two Minimal Requirements Broken Down into ~2-5 Smaller Tasks

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

## UI Mock Design

![Dashboard Design.jpg](docs%2FDashboard%20Design.jpg)

## Rough Sketches

### Diagram of home page user interface of application

![Dashboard Sketch.jpg](docs%2FDashboard%20Sketch.jpg)

### Diagram showing user interface of flash card section

![Flashcard Sketch.png](docs%2FFlashcard%20Sketch.png)

# Crediting

- [Update every minute clock used in GanttChart.jsx](https://stackoverflow.com/a/23450004)
- [Login Authentication Code Snippets](https://www.bezkoder.com/node-js-express-login-mongodb/#Create_Nodejs_Login_with_MongoDB_App)

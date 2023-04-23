<h1 align="center">Notable</h1>

<br>

<p align="center">
  <a href="">
    <img alt="Notable Logo" src="/public/favicon.svg?raw=true" width="200">
  </a>
</p>

<p align="center">
    Note-taking app that elegantly captures and organizes your ideas, wherever you go.
</p>

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Room for Improvement](#room-for-improvement)

## General Information

A note-taking app where users can easily create, edit, and organize their notes using customized tags for quick and efficient search and filtering.

To explore the live app visit: [https://does-not-exist-yet.com](/).

## Technologies Used

- TypeScript
- React
  - React Router
- Tailwind

## Features

- Create, update and delete notes and their related tags.
- Notes and tags persisted in local storage.
- Dark mode.
- Markdown support.

## Screenshots

<a href="/">
  <img alt="Notable notes" src="/public/screenshots/notes.jpg?raw=true">
</a>

<a href="/">
  <img alt="Notable filter notes" src="/public/screenshots/filter-notes.jpg?raw=true">
</a>

<a href="/">
  <img alt="Notable note" src="/public/screenshots/note.jpg?raw=true">
</a>

<a href="/">
  <img alt="Notable edit note" src="/public/screenshots/edit-note.jpg?raw=true">
</a>

<a href="/">
  <img alt="Notable edit tags" src="/public/screenshots/edit-tags.jpg?raw=true">
</a>

<a href="/">
  <img alt="Notable notes - light" src="/public/screenshots/notes-light.jpg?raw=true">
</a>

## Setup

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/LukasV3/notable.git

# Go into the repository
$ cd notable

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Room for Improvement

To do:

- Persist dark mode state using local storage.
- Only show search and tag input filters if there are notes to show otherwise hide.
- Only show edit tags button if there are tags to edit otherwise hide.
- Fix inconsistencies with some of the hover/dark mode states.
- Add a back button on the new note page.

# WasteWise

Hi there! Known as 'Recycle Bin', we're [Lais Moraes](https://github.com/laisjmvet), [Sumeetpal Choat](https://github.com/SumeetChoat), [Guy Vernon](https://github.com/Gilheim) and [Marcell Batta](https://github.com/ioptyu2).

We're all members of the [La Fosse Academy](https://www.lafosseacademy.com/). And for our second group project we were tasked with creating a community app that utilises the citizens of Florin Council to make a safe and clean town!(full brief [here])(https://github.com/LaFosseAcademy/cohort_resources/blob/main/liskov/projects/lap2-project.md).

We decided to make a waste management app called **WasteWise** where the residents of Florin will be able to organise their household waste into divided spaces via new bins provided by the local authority. Residents can now contribute to their hometown and relieve the desperate shortages on local services by doing their part!

You can see a copy of our project presentation slides [here](https://github.com/SumeetChoat/RecycleBin).

## Table of Contents

- [Known bugs](#known-bugs)
- [Installation](#install-and-run-this-project-locally)
- [Description](#description)
- [Features and Usage](#features-and-usage)
- [Technology Used](#technology-used)
- [Our Process](#our-process)
- [Other Issues](#other-issues)
- [Future Features](#future-features)

## Known Bugs
- Bins not showing for some users.

## Install and Run This Project Locally

### Requirements

[Node](https://nodejs.org/en). Type `node -v` in your terminal. If it doesn't give you a version number then you need to install [node](https://nodejs.dev/en/download/).

### Installation

- Launch Terminal, GitBash or your Shell of choice.
- Use `cd name-of-folder` to navigate to where you want to have the `RecycleBin` folder and repository saved.
    - For example, the command `cd Dropbox/code` will result in the following folder structure `Dropbox/code/RecycleBin` once you've pulled the repository.
- Clone into the repository: `git clone https://github.com/SumeetChoat/RecycleBin.git`
- Navigate into the folder via `RecycleBin`
- Open up the folder in Visual Studio Code via `code .`
    - Skip the step above if you use a different code editor.
- Open index.html with live server.

## Features and Usage

The website allows the user to login/register and will be shown relevant information for their registered address such as collection dates.

Users may input proposed waste, such as 'Cardboard pizza box' into a search box and the webpage will output information about which bin will be suitable for them.

The website also allows the user to book a collection for large items which do not fit into the provided bins such as furniture. This will come as an extra cost.  

### Key Features
- There are now more bins per household in Florin than ever before. It can be tricky for our users to know when their bins are going so this app will help distinguish area codes and how this decides your collection days.
- Users can register for the app and virtually place items into a bin. The user can then collect points based off the items disposed of which will later translate into physical rewards at a local sponsoring supermarket.
- Users may also use this page to organise the collection of bulky waste which could include (but not limited to) sofa, fridge etc but this will come at an extra cost.
- Additonal features include the ability for users to change their address and their corresponding collection date will change accordingly.
- There is Admin page which allows items to be updated as well as residential details.

## Technology Used

- HTML
- CSS
- JavaScript
- Bootstrap
- Jest
- Supertest
- Node
	- [npm](https://www.npmjs.com/) dependencies
		- express: routing of HTTP methods and URLs.
		- cors: handling cross-origin requests in Node.js applications.
		- dotenv: for better and more secure loading of environment variables.
		- bcrypt: for password hashing and encryption.
		- jest: for testing and assertions.
		- nodemon: for automatically restarting the server during development.
		- pg: a PostgreSQL client library for Node.js.
		- supertest: for HTTP integration testing.
		- uuid: for generating unique identifiers.



## Our Process

Our group focussed on getting some back end functionality for the website before looking at detail on the front-end. 

## Other Issues
- Points system is incomplete which means that there is no leaderboard functionality. Points cannot be redeemed against rewards which was the whole point of them.

## Future Features
- Add pay functionality to bulky waste.
- More Admin editing features.
- Complete points functionality.

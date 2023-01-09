  <a href="https://rungs.herokuapp.com" target="_blank">![rungs_icon_full](https://user-images.githubusercontent.com/98988710/211232988-60176a62-9326-4ee5-ae1a-8f367365cc95.png)</a>


  
  <p align="center">
    <a href="https://rungs.herokuapp.com" target="_blank">- Check out the live site -</a>
  </p>
    <br />
    <br />
    <br />
</p>

## Table of contents:
* [Project Information](#project-information)
* [Features](#features)
* [Planned Features](#planned-features)
* [Technologies](#technologies)
* [How to Navigate the Site](#how-to-navigate-the-site)
* [Get Started](#get-started)
* [Rungs Was Built By](#rungs-was-built-by)

## Project Information:

<br />

<p>
Rungs is a full stack clone of the popular professional networking site Linkedin. Rungs Users can sign up for an account and personalize their profile to their liking.

Rungs Users can write and submit posts with or without images attached. They can choose to either share these posts publicly or to keep them private and share them only with other Users who they are connected with. Rungs Users can also like any post to show their appreciation.

If a Rungs User wishes to find another Rungs User, they have the ability to easily search for them by first name, last name, or both. Once they have found a User, they can choose to follow them. If they other User chooses to return the follow, the two Users will be connected, and be able to view one another's private posts.
</p>

<br />

## Features:

<br />

Currently implemented features include:
- Signup and Login functionality for Users
- Create, read, update functionality for Users Profiles:
   * Functionality is available for User's Profile Image, Banner Image, and Bio.
   * AWS S3 used for Profile Image and Banner Image Upload
- Create, read, update, and delete functionality for Posts
   * Posts can be set to either 'Public' or 'Connections Only'
- Create, read, update, and delete functionality for Post Images
   * AWS S3 used for Post Image Upload
- Create, read, and delete functionality for a User's Network:
   * Users can Follow other Users, be Followed by other Users, and in the case that it is a mutual connection, the two Users will be considered Connections and will be allowed to view one another's private posts.
- Create, read, and delete functionality for Likes on Posts
- Create and read functionality for User Search

## Planned Features:

<br />

Upcoming features include:
- Create and read live messages/dms between users using SocketIO on the frontend and Flask-SocketIO on the backend.
- View suggested Users who are within 2 degrees of separation from the currently logged in User.
- Create, read, update and delete functionality for Job Postings.

## Technologies:

<br />

* [React](https://beta.reactjs.org/)
* [Redux](https://redux.js.org/)
* [Python](https://www.python.org/)
* [JavaScript](https://devdocs.io/javascript/)
* [NodeJS](https://nodejs.org/en/docs/)
* [NPM](https://docs.npmjs.com/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/en/latest/)
* [AWS S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Sqlite](https://www.sqlite.org/docs.html)
* [CSS3](https://devdocs.io/css/)
* [HTML5](https://devdocs.io/html/)
* [Git](https://devdocs.io/git/)

<br />

## Site Preview:

<br />

  <a href="https://rungs.herokuapp.com" target="_blank">![rungs herokuapp com_](https://user-images.githubusercontent.com/98988710/211233061-587a65bf-21b0-46a2-a92d-79039ffc886c.png)</a>


<br/>

## Get Started:

<br />

To run the app locally, navigate to the root directory of the project in the terminal and enter `flask run`. In a separate terminal, navigate to the `/react-app` directory and enter `npm start`. This should automatically launch a browser window navigated to the proper localhost address. By default, the app will be running on port 3000.

## Rungs Was Built By:

<br />
* Gray Nance - [GitHub](https://github.com/g-wn) - [LinkedIn](https://www.linkedin.com/in/gray-nance/)

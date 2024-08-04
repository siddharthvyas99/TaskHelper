# TasksHelper

Summary: TaskHelper is a simple task management application. The application
allows users to create, update, and delete tasks. Tasks have a title,
description, due date, assignee, creator and a status (e.g., "To Do," "In
Progress," "Done"). Users can view the list of tasks and filter them by status,
based on authorization of tasks i.e. list show tasks which are either assigned
to them or created by them. The UI handles case of due date of tasks by showing
the date in red depicting overdue and users receive email notification based on
list of overdue tasks.

Check live app deployment at - https://taskhelper.neetodeployapp.com/ Note: The
app can be in sleep mode on the above deployment, wait as per screen
instructions

Front-End Requirements Addressed:

User Interface:

- A form to create a new task with fields for title, description, and status.
  Same form component utilized in Create and Edit task feature
- A list of tasks with the ability to update the status or delete a task.
- A filter or dropdown to filter tasks by status (e.g., "All," "To Do," "In
  Progress," "Done").

User Experience: Implement smooth and responsive user interactions using
Tailwind CSS and React, including form validation to ensure that tasks cannot be
created without a title.

Styling: Used Tailwind CSS, SASS and CSS3 to handle application styling

Back-End Requirements:

API Development: Create a RESTful API to handle the CRUD (Create, Read, Update,
Delete) operations for tasks.

Data Storage: Implement a database to store task data. You can use any database
system (e.g., PostgreSQL, MySQL, MongoDB) and set up the necessary data models
to represent tasks.

Validation: Implement server-side validation to ensure that task data is valid
before saving it to the database. Tasks must have a title and a valid status.

Error Handling: Properly handle errors, including sending appropriate error
messages and status codes in response.

Code Strucuture:
UI structure - [UI File Strucuture](./docs/ui_structure.md)

Version Control: Git

Testing: Unit tests for controllers and models are writted using Rails Minitest.

Additional features:

- User authentication and authorization to restrict access to tasks.

- Task due dates and reminders.

- User profiles with avatars.

## Development Setup:

- System dependencies Development is done on MacOS
  - Xcode
  - Homebrew
  - NVM
  - Yarn
  - Rbenv
  - Redis
  - PostgreSQL

If your system already have system dependencies setup proceed with following commands to complete
application setup

Follow the below guide to setup development environment for MacOS
setup will be fairly similar for Linux as well
[Development dependecy setup](./docs/development.md)

Checklist
- Ensure Homebrew installation (For Mac only, use respective commands for other OS)
- Ensure PostgreSQL db is up and running
- Ensure Redis is installed and running
- Ensure yarn is installed
- Ensure Xcode is installed with dev. tools
- Ensure NVM installation
- Ensure Rbenv installation
- Ensure .env file present use this file 
  https://drive.google.com/drive/folders/1azFa8hzPUb3xE3j9DH7ZzNGnDH3-kaP2?usp=drive_link

Finally complete the setup using -
- `bundle exec rails setup`

- Ruby version
  - 3.2.4

- Configuration
  - Running app will require running the command `./bin/setup` and env variables
    correctly set. Since the app uses AWS S3 for file upload feature given env
    vars correctly set is required
    ```bash
    AWS_REGION="AWS S3 configured region"
    AWS_BUCKET="bucket-name"
    AWS_ACCESS_KEY_ID="AWS S3 IAM access key id"
    AWS_SECRET_ACCESS_KEY="AWS S3 IAM Secrey key"
    ```

- Database creation and initialization both are handled when `./bin/setup` is
  run

- How to run the test suite Use command `bundle exec rails t` to run Rails unit
  tests

- Services (job queues, cache servers, search engines, etc.)

- Deployment
  - App is deployed on neetoDeploy (www.neeto.com/neetodeploy)

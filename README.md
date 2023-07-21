# web-store-project
A project for development skills: Full stack course. A basic web store with user authentification, shopping cart and sending an order to database.

<h2>Web store project</h2>

Frontend done using angular, source code can be found in angular-src folder.

<h3>HOW TO RUN:</h3>

<h5>Frontend:</h5>
in angular-src folder:
'npm i --force'
'ng serve'

The server will be running in http://localhost:4200

The --force flag is needed, because some of the
node module dependencies don't match with each other.
This isn't optimal, but I didn't find a way to solve the
dependencies. 

<h5>Backend:</h5>
The backend cannot actually be run, because it accesses the 
database on MongoDB Atlas, and the required authentication is
in a untracked config folder.

Both frontend and backend are running online on google cloud apps,
and can be accessed from the link below:

https://ultra-ridge-392020.lm.r.appspot.com/

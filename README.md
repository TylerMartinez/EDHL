# EDHL-Overlay
An overlay generator based on a Google Sheet ran EDH League meant to be used by OBS streams/recordings

# Pre-Reqs
Intall node 16.14.0, I use a node version manager cli called nvm.

# How to run
In the project root do `npm install` and then `npm start`. This will build the react app once and have it be staically served, hot reloading is enabled on the server directory.

If you want to run just the react app so you can dev and have it hot reload do `cd client` and then `npm start`. You can then open a second terminal with the server running `npm dev` in root

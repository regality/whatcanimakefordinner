run:
	make -j 3 _run

_run: start browserify

start:
	NODE_ENV=development supervisor -w controllers app.js

browserify:
	node ./bin/browserify.js

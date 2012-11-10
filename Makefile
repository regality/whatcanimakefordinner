run:
	make -j 3 _run

_run: start browserify

start:
	supervisor -w controllers app.js

browserify:
	node ./bin/browserify.js

run:
	make -j 3 _run

_run: start browserify

start:
	NODE_ENV=development supervisor app.js

browserify:
	browserify \
		--verbose \
		--watch \
		--alias 'jquery:jquery-browserify' \
		--require 'jquery-browserify' \
		--entry client/main.js \
		--outfile public/js/main.js

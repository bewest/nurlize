
BLANKET=--require blanket 
travis-cov:
	NODE_ENV=test node_modules/.bin/mocha ${BLANKET} -R 'travis-cov' ./test/test*.js

coveralls:
	NODE_ENV=test \
	./node_modules/.bin/mocha ${BLANKET} -R mocha-lcov-reporter \
    test/test*.js | ./coverall.sh

coverhtml:
	./node_modules/.bin/mocha ${BLANKET} -R html-cov test/*.js > test/coverage.html

test:
	mocha --verbose -R tap test/*.js

travis: test travis-cov coveralls coverhtml

.PHONY: test

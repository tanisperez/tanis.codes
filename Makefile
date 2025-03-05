run:
	hugo --logLevel debug --config config-local.toml server -D

build:
	hugo --minify --config config-pro.toml

clean:
	rm -Rf public/
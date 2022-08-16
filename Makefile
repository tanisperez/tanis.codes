run:
	hugo --config config-local.toml server -D

build:
	hugo --minify --config config-pro.toml
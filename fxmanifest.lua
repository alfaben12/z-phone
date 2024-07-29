fx_version 'bodacious'
game 'gta5'
lua54 'yes'
author 'Alfaben'
description 'iPhone 15'
version '1.0.0'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client/main.lua',
    'client/animation.lua'
}

ui_page 'web/build/index.html'

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua'
}

files {
    'web/build/index.html',
	'web/build/**/*',
}
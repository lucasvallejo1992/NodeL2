const ini = require('ini').parse(
    require('./config.ini', 'utf-8')
);

// Default values appropriate for L2 Classic 1.0 client
const Config = {
    database: {
        hostname    :   (ini.Database.Hostname      ?? '127.0.0.1'),
        port        : + (ini.Database.Port          ?? '3306'),
        user        :   (ini.Database.User          ?? 'root'),
        password    :   (ini.Database.Password      ?? ''),
        name        :   (ini.Database.Name          ?? 'nodel2')
    },

    authServer: {
        hostname    :   (ini.AuthServer.Hostname    ?? '127.0.0.1'),
        port        : + (ini.AuthServer.Port        ?? '2106'),
        protocol    : + (ini.AuthServer.Protocol    ?? '0xc621'),
        blowfishKey :   (ini.AuthServer.blowfishKey ?? '6b60cb5b82ce90b1cc2b6c556c6c6c6c'),
        autoCreate  :   (ini.AuthServer.Autocreate  ?? true)
    },

    gameServer: {
        hostname    :   (ini.GameServer.Hostname    ?? '127.0.0.1'),
        port        : + (ini.GameServer.Port        ?? '7777'),
        maxPlayers  : + (ini.GameServer.MaxPlayers  ?? '1000'),
        id          : + (ini.GameServer.Id          ?? '1')
    },

    client: {
        protocol    : + (ini.Client.Protocol        ?? '19'),
        sessionKey1 : + (ini.Client.SessionKey1     ?? '0x55555555'),
        sessionKey2 : + (ini.Client.SessionKey2     ?? '0x44444444')
    }
};

module.exports = Config;

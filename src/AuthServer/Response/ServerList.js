let OSAttributes = require('os');
let ServerPacket = invoke('ServerPacket');

function serverList(config) {
    let packet = new ServerPacket(24); // 19

    let network    = OSAttributes.networkInterfaces();
    let host       = network['en0'][1].address.split('.');
    let port       = config.port;
    let maxPlayers = config.maxPlayers

    packet
        .writeC(0x04)
        .writeC(1)          // Number of servers
        .writeC(0)          // LS Number
        .writeC(1)          // Server ID
        .writeC(host[0])    // Server IP
        .writeC(host[1])    // Server IP
        .writeC(host[2])    // Server IP
        .writeC(host[3])    // Server IP
        .writeD(port)       // Server port
        .writeC(100)        // Age limit
        .writeC(0)          // PVP ? 1 = Yes, 0 = No
        .writeH(0)          // Current players
        .writeH(maxPlayers) // Max players
        .writeC(1);         // Status ? 1 = Up, 0 = Down

    return packet.buffer;
}

module.exports = serverList;

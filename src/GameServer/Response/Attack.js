let ServerPacket = invoke('ServerPacket');

function attack(player, targetId) {
    let packet = new ServerPacket(28);

    packet
        .writeC(0x06)
        .writeD(player.id)
        .writeD(targetId)
        .writeD(1) // Damage
        .writeC(0) // Hit
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z)
        .writeH(0);

    return packet.buffer;
}

module.exports = attack;
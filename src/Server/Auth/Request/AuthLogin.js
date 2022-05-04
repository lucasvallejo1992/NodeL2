let ServerResponse = invoke('Server/Auth/Response');
let ClientPacket   = invoke('Packet/Client');
let Config         = invoke('Config');
let Database       = invoke('Database');
let Utils          = invoke('Utils');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(128) // Encrypted Block
        .readD();   // Session ID

    let decrypted = invoke('Cipher/RSA').decrypt(
        packet.data[0]
    );

    consume(session, {
        username: Utils.stripNull(decrypted.slice(0x5e, 0x5e + 14)), // C4 and before: 0x62
        password: Utils.stripNull(decrypted.slice(0x6c, 0x6c + 16)), // C4 and before: 0x70
    });
}

function consume(session, data) {
    Database.fetchUserPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            session.dataSend(
                data.password === password ? ServerResponse.loginSuccess(Config.client) : ServerResponse.loginFail(0x02)
            );
        }
        else { // User account does not exist, create if needed
            if (Config.authServer.autoCreate) {
                Database.createAccount(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else {
                session.dataSend(
                    ServerResponse.loginFail(0x04)
                );
            }
        }
    });
}

module.exports = authLogin;

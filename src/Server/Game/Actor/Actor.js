const ServerResponse = invoke('Server/Game/Network/Response');
const Creature       = invoke('Server/Game/Actor/Creature');
const Database       = invoke('Server/Database');

class Actor extends Creature {
    fetchUsername() {
        return this.model.username;
    }

    fetchClassId() {
        return this.model.classId;
    }

    fetchRace() {
        return this.model.race;
    }

    fetchExp() {
        return this.model.exp;
    }

    fetchSp() {
        return this.model.sp;
    }

    fetchStr() {
        return this.model.str;
    }

    fetchDex() {
        return this.model.dex;
    }

    fetchCon() {
        return this.model.con;
    }

    fetchInt() {
        return this.model.int;
    }

    fetchWit() {
        return this.model.wit;
    }

    fetchMen() {
        return this.model.men;
    }
    
    fetchPvp() {
        return this.model.pvp;
    }

    fetchPk() {
        return this.model.pk;
    }

    fetchSex() {
        return this.model.sex;
    }

    fetchFace() {
        return this.model.face;
    }

    fetchHair() {
        return this.model.hair;
    }

    fetchHairColor() {
        return this.model.hairColor;
    }

    fetchKarma() {
        return this.model.karma;
    }

    fetchEvalScore() {
        return this.model.evalScore;
    }

    fetchRecRemain() {
        return this.model.recRemain;
    }

    fetchIsCrafter() {
        return this.model.crafter;
    }

    fetchIsGM() {
        return this.model.isGM;
    }

    fetchIsOnline() {
        return this.model.isOnline;
    }

    fetchIsActive() {
        return this.model.isActive;
    }

    moveTo(session, coords) {
        session.dataSend(
            ServerResponse.moveToLocation(this.fetchId(), coords)
        );
    }

    updatePosition(coords) {
        this.model.locX = coords.locX;
        this.model.locY = coords.locY;
        this.model.locZ = coords.locZ;

        Database.storeCharacterLocation(this.fetchId(), coords);
    }

    select(session, data) {
        if (this.fetchId() === data.destId) { // Click on self
            this.unselect(session);
            session.dataSend(ServerResponse.destSelected(data.destId));
            return;
        }
        else {
            utils.infoFail('GameServer:: User selection unimplemented')
        }
    }

    unselect(session) {
        session.dataSend(
            ServerResponse.destDeselected(this)
        );
    }

    basicAction(session, data) {
    }

    socialAction(session, actionId) { // TODO: Check if action is prohibited
        session.dataSend(
            ServerResponse.socialAction(this.fetchId(), actionId)
        );
    }
}

module.exports = Actor;

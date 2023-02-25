const ServerResponse = invoke('Server/Game/Network/Response');
const CreatureState  = invoke('Server/Game/Creature/State');

class Creature {
    constructor(data) {
        this.model = data;
        this.state = new CreatureState();

        // Schedule timer
        this.timer = undefined; // TODO: Move this into actual GameServer timer
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    setHp(data) {
        this.model.hp = data;
    }

    setMp(data) {
        this.model.mp = data;
    }

    setLocX(data) {
        this.model.locX = data;
    }

    setLocY(data) {
        this.model.locY = data;
    }

    setLocZ(data) {
        this.model.locZ = data;
    }

    setHead(data) {
        this.model.head = data;
    }

    setLocXYZH(coords) {
        this.setLocX(coords.locX);
        this.setLocY(coords.locY);
        this.setLocZ(coords.locZ);
        this.setHead(coords.head);
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchName() {
        return this.model.name;
    }

    fetchTitle() {
        return this.model.title;
    }

    fetchLevel() {
        return this.model.level;
    }

    fetchHp() {
        return this.model.hp;
    }

    fetchMaxHp() {
        return this.model.maxHp;
    }

    fetchMp() {
        return this.model.mp;
    }

    fetchMaxMp() {
        return this.model.maxMp;
    }

    fetchPAtk() {
        return this.model.pAtk;
    }

    fetchPDef() {
        return this.model.pDef;
    }

    fetchMAtk() {
        return this.model.mAtk;
    }

    fetchMDef() {
        return this.model.mDef;
    }

    fetchAtkSpd() {
        return this.model.atkSpd;
    }

    fetchCastSpd() {
        return this.model.castSpd;
    }

    fetchWalk() {
        return this.model.walk;
    }

    fetchRun() {
        return this.model.run;
    }

    fetchSwim() {
        return this.model.swim;
    }

    fetchRadius() {
        return this.model.radius;
    }

    fetchSize() {
        return this.model.size;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ;
    }

    fetchHead() {
        return this.model.head;
    }

    // Abstract

    isDead() {
        return this.model.hp <= 0;
    }

    calcDistance(creatureSrc, creatureDest) {
        const dX = creatureDest.fetchLocX() - creatureSrc.fetchLocX();
        const dY = creatureDest.fetchLocY() - creatureSrc.fetchLocY();

        //const sin = dY / distance;
        //const cos = dX / distance;

        return Math.sqrt((dX * dX) + (dY * dY));
    }

    scheduleArrival(session, creatureSrc, creatureDest, offset, callback) {
        const ticksPerSecond = 10;
        const distance = this.calcDistance(creatureSrc, creatureDest) - offset;

        // Execute each time, or else actor is stuck
        session.dataSend(
            ServerResponse.moveToPawn(creatureSrc, creatureDest, offset)
        );

        // Melee radius, no need to move
        if (distance <= creatureDest.fetchRadius() + 30) {
            this.abortScheduleTimer();
            callback();
            return;
        }

        if (this.state.fetchOnTheMove()) {
            return;
        }

        // Calculate duration and reset
        const ticksToMove = 1 + ((ticksPerSecond * distance) / creatureSrc.fetchRun());
        this.abortScheduleTimer();

        // Actor is occupied
        this.state.setOnTheMove(true);

        // Arrived
        this.timer = setTimeout(() => {
            this.state.setOnTheMove(false);
            callback();

        }, (1000 / ticksPerSecond) * ticksToMove);
    }

    abortScheduleTimer() {
        this.state.setOnTheMove(false);

        clearTimeout(this.timer);
        this.timer = undefined;
    }

    isBusy(session) {
        if (this.state.isBusy()) {
            session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }

    statusUpdateVitals(session, creature) {
        session.dataSend(
            ServerResponse.statusUpdate(creature.fetchId(), [
                { id: 0x9, value: creature.fetchHp   () },
                { id: 0xa, value: creature.fetchMaxHp() },
                { id: 0xb, value: creature.fetchMp   () },
                { id: 0xc, value: creature.fetchMaxMp() },
            ])
        );
    }
}

module.exports = Creature;

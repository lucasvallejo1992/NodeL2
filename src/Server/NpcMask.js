class NpcMask {
    constructor() {
        this.mask = {
            M_ID           :  0,
            M_ATTACKABLE   :  1,
            M_UNK1         :  2,
            M_NAME         :  3,
            M_POSITION     :  4,
            M_HEADING      :  5,
            M_UNK2         :  6,
            M_ATK_SPEED    :  7,
            M_SPEED_MUL    :  8,
            M_EQUIPPED     :  9,
            M_ALIVE        : 10,
            M_RUNNING      : 11,
            M_SWIM_FLY     : 14,
            M_TEAM         : 15,
            M_ENCHANT      : 16,
            M_FLYING       : 17,
            M_CLONE        : 18,
            M_UNK8         : 19,
            M_DISPLAY      : 22,
            M_TRANSFORM    : 23,
            M_HP           : 24,
            M_MP           : 25,
            M_MAX_HP       : 26,
            M_MAX_M        : 27,
            M_UNK11        : 28,
            M_UNK12        : 29,
            M_TITLE        : 30,
            M_NAME_ID      : 31,
            M_TITLE_ID     : 32,
            M_PVP_FLAG     : 33,
            M_NAME_COLOR   : 34,
            M_CLAN         : 35,
            M_ABNORMALS    : 36,
            M_VISUAL_STATE : 37,
        };

        this.componentSize = [
            0x04, 0x01, 0x04, 0x02, 0x0c, 0x04, 0x04, 0x08,
            0x08, 0x0c, 0x01, 0x01, 0xff, 0xff, 0x01, 0x01,
            0x04, 0x04, 0x04, 0x04, 0xff, 0xff, 0x04, 0x04,
            0x04, 0x04, 0x04, 0x04, 0x01, 0x08, 0x02, 0x04,
            0x04, 0x01, 0x04, 0x14, 0x00, 0x01, 0x00, 0x00,
        ];

        this.staticBlock = [
            -128, 64, 32, 16, 8, 4, 2, 1
        ];
    }

    add(masks, component) {
        return masks[component >> 3] |= this.staticBlock[component & 0x7];
    }
}

module.exports = NpcMask;
const { Client } = require('discord.js');
const ClientUtil = require('./ClientUtil');

/**
 * The Akairo framework client.
 * Creates the handlers and sets them up.
 * @param {AkairoOptions} [options={}] - Options for the client.
 * @param {ClientOptions} [clientOptions] - Options for Discord JS client.
 * If not specified, the previous options parameter is used instead.
 */
class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', developerID = '' } = options;

        /**
         * The ID of the owner(s).
         * @type {Snowflake|Snowflake[]}
         */
        this.ownerID = ownerID;

        /**
         * The ID of the Developer(s)
         * @type {Snowflake|Snowflake[]}
         */
        this.developerID = developerID
        /**
         * Utility methods.
         * @type {ClientUtil}
         */
        this.util = new ClientUtil(this);
    }

    /**
     * Checks if a user is the owner of this bot.
     * @param {UserResolvable} user - User to check.
     * @returns {boolean}
     */
    isOwner(user) {
        const id = this.users.resolveID(user);
        return Array.isArray(this.ownerID)
            ? this.ownerID.includes(id)
            : id === this.ownerID;
    }

    /**
     * Check if a user is developer of this bot.
     * @param {UserResolvable} user
     * @returns {boolean}
     */
    isDeveloper(user) {
        if (this.isOwner(user.id)) return true;
        if (Array.isArray(this.developerID) && this.developerID.includes(user.id)) return true;
        else if (user.id === this.developerID) return true;
        else return false;
    }
}

module.exports = AkairoClient;

/**
 * Options for the client.
 * @typedef {Object} AkairoOptions
 * @prop {Snowflake|Snowflake[]} [ownerID=''] - Discord ID of the client owner(s).
 * @prop {Snowflake|Snowflake[]} [developerID=''] - Discord ID of the client developer(s).
 */

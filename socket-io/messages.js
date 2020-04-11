const moment = require('moment');

    function formatMessage(username, text) {
        return {
            username,
            text,
            time: moment().format('h:mm:a')
        }
    }

    module.exports = formatMessage;

    //mongo object try REDIS to cache messages and send all together
 
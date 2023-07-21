const { response } = require('../app');
const { messaging } = require('../config/firebaseInit');

const sendNotification = (tokens, data) => {
    
    messaging
        .sendEachForMulticast({ tokens, data })
        .then(response => {
            const successes = response.responses.filter(Boolean).length;
            const failures = response.responses.length - successes;

            console.log(
                "notification sent:",
                `${successes} successful, ${failures} failed`
            );
        })
        .catch((err) => {
            console.log('Error FCM: ', err);
        });
}

module.exports = {
    sendNotification
}
/**
 * References
 * - https://github.com/chidimo/Fireact
 */
const { response } = require('../app');
const { messaging } = require('../config/firebaseInit');

const sendNotification = (tokens, notification) => {
    
    messaging
        .sendEachForMulticast({ tokens, notification })
        .then(response => {

            console.log(
                "notification sent:",
                `${response.successCount} successful, ${response.failureCount} failed`
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
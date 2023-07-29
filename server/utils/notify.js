const { response } = require('../app');
const { messaging } = require('../config/firebaseInit');

const sendNotification = (tokens, data) => {
    
    messaging
        .sendEachForMulticast({ tokens, data })
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
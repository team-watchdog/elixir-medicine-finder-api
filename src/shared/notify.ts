import axios from "axios";

// constants
const NOTIFY_LK_API_KEY = process.env.NOTIFY_LK_API_KEY;
const NOTIFY_LK_USER_ID = process.env.NOTIFY_LK_USER_ID;

export class Notify{
    static async sendSMS(phoneNumber: string, message: string): Promise<boolean>{
        var configPlaceSearch = {
            method: 'post',
            url: 'https://app.notify.lk/api/v1/send',
            headers: { },
            data: {
                "user_id": NOTIFY_LK_USER_ID,
                "api_key": NOTIFY_LK_API_KEY,
                "sender_id": "NotifyDEMO",
                "to": phoneNumber,
                "message": message
            }
        };

        try {
            const resp = await axios(configPlaceSearch);
        } catch (e) {
            return false;
        }
        return true;
    }
}
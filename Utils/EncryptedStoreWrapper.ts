import EncryptedStorage from "react-native-encrypted-storage";

const USER_SESSION = 'USER_SESSION'

export class EncryptedStoreWrapper {
    static saveSession(session: string) {
        EncryptedStorage.setItem(USER_SESSION, session)
            .then(() => console.log("_LOG_ save success"))
            .catch((error) => console.log("_LOG_ save ended with error", error))
    }

    static getSession(): Promise<string | undefined> {
        return EncryptedStorage.getItem(USER_SESSION)
            .then((session) => {
                if (session != null) {
                    return session
                }
            })
    }

    static deleteSession(): Promise<void> {
        return EncryptedStorage.removeItem(USER_SESSION)
    }
}

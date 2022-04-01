import { FirebaseApp, initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, updatePassword, Auth, UserCredential } from "firebase/auth"
import { FirebaseConstants } from "./FirebaseConstants"
import { FirebaseAuthError } from "./FirebaseAuthError"
import { IFirebase } from "./IFirebase"

export class Firebase implements IFirebase {
    constructor (
        private fireabaseApp: FirebaseApp = Firebase.initializeFireabaseApp(),
        private auth: Auth = getAuth(fireabaseApp)
    ) {}

    async registerUserWithEmailAndPassword(email: string, password: string): Promise<string | void> {
        var userCredential: UserCredential | undefined

        await createUserWithEmailAndPassword(this.auth, email, password)
            .then(user => {
                userCredential = user
            })
            .catch(err => {
                switch (err.code) {
                    case FirebaseAuthError.InvalidEmail:
                        throw new Error("Email address is invalid")
                    case FirebaseAuthError.WeakPassword:
                        throw new Error("Password is not strong enough")
                    case FirebaseAuthError.UserAlreadyExists:
                        throw new Error("User already exists")
                    default:
                        throw new Error("An unexpected error occurred")
                }
            })
        return userCredential?.user.uid
    }

    private static initializeFireabaseApp(): FirebaseApp {
        const firebaseConfig = {
            apiKey: FirebaseConstants.apiKey,
            authDomain: FirebaseConstants.authDomain,
            projectId: FirebaseConstants.projectId,
            storageBucket: FirebaseConstants.storageBucket,
            messagingSenderId: FirebaseConstants.messagingSenderId,
            appId: FirebaseConstants.appId
        }
        const app = initializeApp(firebaseConfig)

        return app
    }
}
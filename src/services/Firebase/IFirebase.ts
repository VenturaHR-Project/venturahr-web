export interface IFirebase {
    registerUserWithEmailAndPassword(email: string, password: string): Promise<string | void>
}
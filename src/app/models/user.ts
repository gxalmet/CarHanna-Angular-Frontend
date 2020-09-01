export class User {
    constructor(
        public _id: string,
        public person: {
            firstname: string,
            lastname: string
        },
        public email: string,
        public password: string,
        
    ){

    }
}

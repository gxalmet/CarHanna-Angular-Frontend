export class Team {
    constructor(
        public _id: Object,
        public user_id: String,
        public collegues: [{
            _id: Object,
            email: String,
            person: {
                firstname: String,
                lastname: String
            },
            user_id_col: String,
        }]
    ){

    }
}
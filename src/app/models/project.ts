export class Project {
    constructor(
        public _id: Object,
        public parentId: string,
        public name: string,
        public description: string,
        public user_id : string,
        public check_date: {
            begin_date: Date,
            end_date: Date
        },
        public status: string,
        public team: [{
            team_user_id: string
            
        }]
    ){

    }
}
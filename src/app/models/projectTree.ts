import { Project } from './project';
export class ProjectTree {
    constructor(
        public project: Project,
        public children?: [ { ProjectTree } ]
    ){

        
    }
}
import { Project } from '../models/project';

export interface ProjectTreeInt {
    

        project: Project;
        level?: Number,
        children: ProjectTreeInt[];
      
}[]

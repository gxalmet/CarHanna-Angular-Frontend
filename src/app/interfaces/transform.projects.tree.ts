import { Project } from '../models/project';
//import { ProjectTree } from '../models/projectTree';
import { Observable } from 'rxjs';

import { ProjectTreeInt } from '../interfaces/project-tree-int';

export class transformProjectsTree {
    constructor(
        
    ){
        
    }

    generateTree(projects: Project[]): ProjectTreeInt[]{
        var projectsread = projects.slice(),
        projectsread_help = projects.slice();

        

        var arr: ProjectTreeInt[] = [];
        // primer afegim els projectes origen
        projectsread.forEach(proR1 => {
            if (!proR1.parentId) {

                arr.push({ 'project': proR1, 'level': 1, 'children': [] });
                var index = this.findProject(projectsread_help, proR1._id);
                if (index > -1) {
                    projectsread_help.splice(index, 1);
                }
            }
        })
    
        // Ara afegim el primer nivell
        projectsread.splice(0, projectsread.length);
        projectsread = projectsread_help.slice();
    
        projectsread.forEach(proR2 => {
            var index = this.findProjectTree(arr, proR2.parentId);
            
            if (index > -1) {
                arr[index].children.push({ 'project': proR2, 'level': 2, children: [] });
            }
            var indexDelete = this.findProject(projectsread_help, proR2._id);
            if (index > -1) {
                projectsread_help.splice(indexDelete, 1);
            }
        })
    
        // Ara afegim el segon nivell
    
        projectsread.forEach(proR3 => {
            arr.forEach(arr_lv1 => {
                if (arr_lv1.children.length > 0) {
                    var index = this.findProjectTree(arr_lv1.children, proR3.parentId);
    
                    if (index > -1) {
                        arr_lv1.children[index].children.push({ 'project': proR3, 'level': 3, children: [] });
                        var indexDelete = this.findProject(projectsread_help, proR3._id);
                        if (index > -1) {
                            projectsread_help.splice(indexDelete, 1);
                        }
                    }
                }
            })
        })
        return arr;
    }
    findProjectTree(data: ProjectTreeInt[], value){
        if(data.length>0){
          for (var i = 0; i < data.length; i++) {
            if (data[i].project._id == value) {
                return i;
            }
          }
          return -1;
        }else{
          return -1;
        }
    
    }
    findProject(data: Project[], value){
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id == value) {
                return i;
            }
        }
        return -1;
    }
}

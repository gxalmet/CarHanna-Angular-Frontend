import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';

import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { ConstantPool } from '@angular/compiler';

import { transformProjectsTree } from '../../interfaces/transform.projects.tree';
import { ProjectTreeInt } from '../../interfaces/project-tree-int';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ ProjectService, transformProjectsTree]
})
export class ProjectsComponent implements OnInit {
  
  public title: String;
  
  public projects: Project[];
  
  public message: String;
  public firstname: String;
  public lastname: String;
  public columns: String[];
  public index: String[];

  public nestedTreeControl: NestedTreeControl<ProjectTreeInt>;
  public nestedDataSource: MatTreeNestedDataSource<ProjectTreeInt>;
  public dataChange: BehaviorSubject<ProjectTreeInt[]> = new BehaviorSubject<ProjectTreeInt[]>([]);

  constructor(

    private _projectService: ProjectService,
    
  	private _router: Router,
    private _route: ActivatedRoute
    
  ) { 
    
  }

  ngOnInit(): void {


    this.title = 'Welcome to your project management!!'
    
    //this.getProjects();
    this.columns = ["Name","Description","Begin date", "End date", "Status"];
    this.index = ["name", "description", "check_date.begin_date", "check_date.end_date", "status"];

    //this.nestedTreeControl = new NestedTreeControl<ProjectTree>(this._getChildren);
    const GetChildren = (node: ProjectTreeInt) => (node.children);
    this.nestedTreeControl = new NestedTreeControl<ProjectTreeInt>(GetChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    
    
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);
    this.getProjects();
    
  }
    
  getProjects(){
    
    this._projectService.getProjects(null).subscribe(
      responseP =>{
        
        this.projects = responseP.projects;

        this.setProjectsTree();
        
      },
      errorP => {
        this.message= errorP.error.message;

      }
    )
  }

  onCreateproject(){
    this._router.navigate( ['createproject' ] );
  }
  setProjectsTree(){
    
    var arr: ProjectTreeInt[] = [];

    var projectsread: Project[] = [];
    
    if(this.projects){
      projectsread = this.projects.slice(0, this.projects.length);

      var tranform = new transformProjectsTree;
  
      arr = tranform.generateTree(projectsread);
  
      this.dataChange.next(arr);
    }
    // projectsread = this.projects.slice(0, this.projects.length);

    // var tranform = new transformProjectsTree;

    // arr = tranform.generateTree(projectsread);

    // this.dataChange.next(arr);

  }

  getKeys(obj){
    return Object.keys(obj)
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

  onNavigate(project){
    //this._router.navigate( ['editproject/' + project._id ] );
    this._router.navigate( ['editproject'], {queryParams: { id: project._id }, queryParamsHandling: 'merge'});
  }
  getChildren(node: ProjectTreeInt) { 
    
    return observableOf(node.children); 
  }
  hasNestedChild(_: number, nodeData: ProjectTreeInt) {
    return  nodeData ; 
  }
}

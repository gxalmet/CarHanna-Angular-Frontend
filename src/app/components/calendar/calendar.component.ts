import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectTree } from '../../models/projectTree';

import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { transformProjectsTree } from '../../interfaces/transform.projects.tree';
import { ProjectTreeInt } from '../../interfaces/project-tree-int';
import { DateCalendar } from '../../interfaces/date-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ ProjectService]
})
export class CalendarComponent implements OnInit {
  public title: String;
  public projects: Project[] = [];
  public projectsTree: ProjectTree[] = [];
  public projectsUse: Project[] = [];
  public message: String;
  public columns: String[];
  public index: String[];
  public dateBeginCal: Date;
  public dateEndCal: Date;
  public dateArray: Date[];
  public colorProjects: DateCalendar[];
  public length: any;

  constructor(
    private _projectService: ProjectService,
    
  	private _router: Router,
  	private _route: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {

    this.getProjects();

  }
   getProjects(){
    
    this._projectService.getProjects(null).subscribe(
      responseP =>{
                
        this.projects = this.projectsUse = responseP.projects;
        
        this.getBeginDate();
        this.getEndDate();
        
        this.dateArray= this.getDates(this.dateBeginCal, this.dateEndCal);
        this.colorProjects = this.getDatesProjects(this.dateBeginCal, this.dateEndCal);
        this.length = this.getLengthDynamic();
        
        
      },
      errorP => {
        
  
        
      }
    )

    this._projectService.getProjects(null).subscribe(
      responseP =>{
                
        this.projectsTree = this.projectsUse = responseP.projects;
        
        this.getBeginDate();
        this.getEndDate();
        
        this.dateArray= this.getDates(this.dateBeginCal, this.dateEndCal);
        this.colorProjects = this.getDatesProjects(this.dateBeginCal, this.dateEndCal);
        this.length = this.getLengthDynamic();
        
        
      },
      errorP => {
        
  
        
      }
    )
  }
  getBeginDate(){
    
    let projectBD = this.projectsUse.slice();
    projectBD.sort(
      function(a,b) {
        var dateA = new Date(a.check_date.begin_date);
        var dateB = new Date(b.check_date.begin_date);
        return  dateA.getTime() - dateB.getTime();
      }
    );
    this.dateBeginCal = new Date(projectBD[0].check_date.begin_date);
  }
  getEndDate(){
    
    let projectED = this.projectsUse.slice();
    projectED.sort(
      function(a,b) {
        var dateA = new Date(a.check_date.end_date);
        var dateB = new Date(b.check_date.end_date);
        return  dateA.getTime() - dateB.getTime();
      }
    );
    
    this.dateEndCal = new Date(projectED[this.projects.length-1].check_date.end_date);
  }
  getDates(beginDate: Date, endDate: Date){
       
      for( var arr=[], dt=new Date(beginDate); dt<=endDate; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;

  }
  getDatesProjects(beginDate: Date, endDate: Date){
    
    var projectLevel =  this.projects.slice();   

    var treeArr: ProjectTreeInt[] = [];

    var projectsread: Project[] = [];
    
    projectsread = this.projects.slice(0, this.projects.length);

    var tranform = new transformProjectsTree;

    treeArr = tranform.generateTree(projectsread);

 

    var dateCalendarArr = [];
    // projectLevel.forEach(project=>{
    treeArr.forEach(project=>{
      
      var i = 0;
      var item: DateCalendar[]= [];
      this.dateArray.forEach(date=>{
        item[i]= this.fillItemDate(project.project, date, project.level);      
        i++;
      });
      dateCalendarArr.push(item);

      project.children.forEach(childLv1=>{
        var j = 0
        item = [];
        this.dateArray.forEach(date=>{
          item[j]= this.fillItemDate(childLv1.project, date, childLv1.level);
          j++;
        });
        dateCalendarArr.push(item);

        childLv1.children.forEach(childLv2=>{
          var k = 0
          item = [];
          this.dateArray.forEach(date=>{
            item[k]= this.fillItemDate(childLv2.project, date, childLv2.level);
            k++;
          });
          dateCalendarArr.push(item);
        })
      })

    });

    return dateCalendarArr;
  
  }

  fillItemDate(project: Project, date: Date, level: Number) :DateCalendar{
    var obj_local: DateCalendar;

    obj_local = {id: '', name: '', level: 0};

    if(date < new Date(project.check_date.begin_date) || date > new Date(project.check_date.end_date)){
      // obj[index]=  {id: '', name: '', level: 0};
      // obj_local['id']=  '';
      // obj_local['name']=   '';
      // obj_local['level']=   0;
    }else{
      // obj[index]= { id: project._id, name: project.name, level: level};
      obj_local['id'] =  project._id.toString();
      obj_local['name'] = project.name;
      obj_local['level'] = level;
    }
    return obj_local;
  }

  findProject(data: Project[], value){
    for (var i = 0; i < data.length; i++) {
      if (data[i]._id == value) {
          return i;
      }
    }
    return -1;
  }
  getLengthDynamic(){
    var arrLengt = [];
    var obj1 = new Object;

    for (let index = 0; index < (this.dateArray.length); index++) {
      
      obj1= index;
      arrLengt.push(obj1);
          
    }

    return arrLengt;
  }
  onNavigate(colorProject){
     this._router.navigate( ['editproject/' + colorProject.id ] );
  }
}

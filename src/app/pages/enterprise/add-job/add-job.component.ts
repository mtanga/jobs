import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, timer } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastService } from 'src/app/services/toast.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';



@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit{

  
  public Editor = ClassicEditor;



  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;

  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  options : any = {};

  job :  any = {
  title : "",
  places : "",
  description : "",
  address: "",
  start : "",
  end : "",
  price : "",
  enterprise : '',
  image : "",
  user : "",
  tasks : [],
  domaine : {
    id : '',
    name : ''
  },
  available : []
};

cardImageBase64 : any;
isImageSaved : any;

task : any;

available : any = 
{
  day : "",
  start : "",
  end : ""
};
listed : any = [];
imageError : any;


term : any = '';
domains : any = {}

constructor(
  public router : Router,
  private notice : ToastService,
  private tools: ToolsService,
  private api : ApiService,

){

}


  ngOnInit(): void {
    this.getOptions();
  }

  getOptions(){
    this.loading = true;
    this.api.getDataAuth("job_options").subscribe(
      (res) => {
        console.log("res", res);
        this.options = res;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }

  addAvailable(){
    console.log("Available2", this.available)
    if(this.available.day=='' || this.available.day==null ||this.available.day==undefined){
      this.notice.warning("Veuillez selectionner un jour", "");
    }
    else if(this.available.start=='' || this.available.start==null ||this.available.start==undefined){
      this.notice.warning("Veuillez selectionner une heure de debut", "");
    }
    else if(this.available.end=='' || this.available.end==null ||this.available.end==undefined){
      this.notice.warning("Veuillez selectionner une heure de fin", "");
    }
    else{
        if(!this.job.available.find(elt => elt.day == this.available.day)){
          //let
          this.job.available.push(this.available);
          
        }
        else{
          //this.job.available.push(this.available);
          this.notice.warning("Veuillez selectionner un autre jour car vous avez deja choisir ce jour", "");
          //this.available.day = '';
        }
    }
    console.log("Available2", this.job)
  }


getDay(id){
  return this.options.days.find(elt => elt.id == id);
}

deleteTask(i){
  this.job.tasks.splice(i, 1);
}

addAsk(){
  console.log("iic", this.task)
  this.job.tasks.push(this.task);
  console.log("iic", this.job)
}

public onReady(editor: ClassicEditor) {
  console.log('CKEditor5 Angular Component is ready to use!', editor);
  //CKEditorInspector.attach(editor);
}
public onChange({ editor }: ChangeEvent) {
  this.job.description = editor.data.get();
  //console.log(editor.data.get());
}

search(){
  if(this.term==''){
    this.listed = [];
  }
  else{
    this.listed = this.options?.domains?.filter((donnee: any) => {
      return donnee.title.toLocaleLowerCase().includes(this.term.toLocaleLowerCase());
    });
  } 
}



getKIll(text: any){
   // return this.kills?.kills?.find((elt: any) => elt.name.toLocaleLowerCase() === text.toLocaleLowerCase());
}

deleteKill(id:any){
this.loading = true;
let data = {
  id : id,
  user : this.user.user.student.id,
  type : "student",
}
this.api.postDataAuth("delete_kill", data).subscribe(
  (res) => {
    console.log("res", res);
    //this.kills = res;
    this.loading = false;
    this.notice.success("Compétence supprimée", "Profil");
    //...
  },
  (err) => {
    this.loading = false;
    //...
  }
);
}


addDomain(){
    console.log("mon domaine", this.term)
    if(!this.options?.domains?.find(elt => elt.title.toLocaleLowerCase() == this.term?.toLocaleLowerCase())){
      console.log("mon domaine 1", this.term);
      this.job.domaine.id = 0;
      this.job.domaine.name = this.term.toLocaleUpperCase();
    }
    else{
      this.job.domaine.id = this.options?.domains?.find(elt => elt.title.toLocaleLowerCase() == this.term?.toLocaleLowerCase()).id;
      this.job.domaine.name = this.term.toLocaleUpperCase();
    }

    console.log("hello", this.job);
}


addJob(){
  console.log('Mon job', this.job)
  this.job.user = this.user.user.id;
  this.job.enterprise = this.user.user.enterprise.id;
  this.loading = true;
  this.api.postDataAuth("add_job", this.job).subscribe(
    (res) => {
      console.log("res", res);
      this.loading = false;
      this.notice.success("Emploi publié avec success", "");
      //...
    },
    (err) => {
      this.loading = false;
      //...
    }
  );
}


fileChangeEvent(fileInput) {
  this.imageError = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';

         // return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);


              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  //return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.job.image = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}



}

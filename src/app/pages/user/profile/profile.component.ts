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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  public Editor = ClassicEditor;



  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  public primaryColour = SecondaryBlue;
  public secondaryColour = PrimaryRed;
  public coloursEnabled = false;

  overview = true;
  settings = false;

  domaineUrl : any;

  user : any = JSON.parse(localStorage.getItem('user') || '{}');
  timerSubscription: any;
  options : any = {};
  userObject : any = {};

  student : any = {
    first_name : "",
    last_name : "",
    classe : "",
    photo : "",
    phone : "",
    address : "",
    birth : "",
    gender : "",
    school : "",
    bio: "",
    cv: "",
    language: "",
    student: "",
    user : "",
    type : "",
  };

  security : any = {
      old : "",
      new : "",
      confirm : "",
      user : "",
  };
  term : any = '';

  kills: any = {};


  studentInfos : any = {};
  listed : any = [];
  imageError : any;
  response : any;
  optionsPassword: any = {};


  constructor(
    public router : Router,
    private notice : ToastService,
    private tools: ToolsService,
    private api : ApiService,

  ) { 
    timer(0, 1000) //call the function immediately and every 10 seconds 
    this.timerSubscription = timer(0, 1000).pipe( 
         map(() => { 
            ///this.user = JSON.parse(localStorage.getItem('user') || '{}');
            //this.studentInfos = this.user.user.student;
            //this.student = this.user.
            //console.log('user ici', this.user);
         }) 
      ).subscribe();
  }



  ngOnInit(): void {
    //console.log("user", this.user.user)
    this.security.user = this.user.user.id;
    this.domaineUrl = this.api.domain_url;
    if(this.user.user.role.code=="CANDIDAT"){
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.setStudent();
      this.getOptions();
      this.getKills();
    }
      
  }

  getKills(){
    this.loading = true;
    let data = {
      user : this.user.user.student.id,
      type : "student"
    }
    this.api.postDataAuth("getKills", data).subscribe(
      (res) => {
        console.log("res", res);
        this.kills = res;
        this.loading = false;
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }

  search(){
    if(this.term==''){
      this.listed = [];
    }
    else{
      this.listed = this.kills?.kills?.filter((donnee: any) => {
        return donnee.name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase());
      });
    } 
  }

  public onReady(editor: ClassicEditor) {
    console.log('CKEditor5 Angular Component is ready to use!', editor);
    //CKEditorInspector.attach(editor);
  }
  public onChange({ editor }: ChangeEvent) {
    this.student.bio = editor.data.get();
    //console.log(editor.data.get());
  }

  checkKillAll(text:any){
    return this.kills?.kills?.filter((item: any) => {
      return item.name.toLocaleLowerCase()==text.toLocaleLowerCase() && this.kills?.ownkills?.find((elt: any) => elt.kill_id === item.id);
    });
  }


  checkKillId(text:any){
    this.kills?.ownkills?.find((range : any) => {
      return (
        range.kill_id === text 
      );
    })
  }

getKIll(text: any){
  return this.kills?.kills?.find((elt: any) => elt.name.toLocaleLowerCase() === text.toLocaleLowerCase());
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
      this.kills = res;
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

addKillSelected(text: any){
  console.log("text", text);
  let data = {
    user : this.user.user.student.id,
    type : "student",
    name : text.toLocaleUpperCase(),
    kill: this.getKIll(text)?.id
  }
  //console.log("Ma competence", this.checkKillAll(this.term));
  if(this.checkKillAll(text).length>0){
    this.notice.error("Vous avez déjà ajouté cette compétence", "Profil");
  }
  else{
    this.loading = true;
    this.api.postDataAuth("addkill", data).subscribe(
      (res) => {
        console.log("res", res);
        this.kills = res;
        this.loading = false;
        this.notice.success("Compétence ajoutée", "Profil");
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }
}

  addKill(){
    let data = {
      user : this.user.user.student.id,
      type : "student",
      name : this.term.toLocaleUpperCase(),
      kill: this.getKIll(this.term)?.id
    }
    console.log("Ma competence", this.checkKillAll(this.term));
    if(this.checkKillAll(this.term).length>0){
      this.notice.error("Vous avez déjà ajouté cette compétence", "Profil");
    }
    else{
      this.loading = true;
      this.api.postDataAuth("addkill", data).subscribe(
        (res) => {
          console.log("res", res);
          this.kills = res;
          this.loading = false;
          this.notice.success("Compétence ajoutée", "Profil");
          //...
        },
        (err) => {
          this.loading = false;
          //...
        }
      );
    }

  }


  getOptions(){
    this.loading = true;
    let data = {
      student : this.user.user.student.id
    }
    this.api.postDataAuth("get_profilestudent", data).subscribe(
      (res) => {
        console.log("Options", res);
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

  

  changetab(item: any){
    console.log("testonst", item)
    if(item=="overview"){
      this.settings = false;
      this.overview = true;
    }
    if(item=="settings"){
      console.log("testonst 33", this.settings)
      this.settings = true;
      this.overview = false;
      console.log("testonst 323", this.settings);
    }

  }

  fileChangeEvent(fileInput: any) {
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
              this.response = rs;
                const img_height = this.response.currentTarget['height'];
                const img_width = this.response.currentTarget['width'];

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
                    //this.cardImageBase64 = imgBase64Path;
                    this.updatePhoto(imgBase64Path);
                    ///this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

updatePhoto(photo : any){
  //console.log("image", photo);
  let data = {
    user : this.user?.user?.id,
    student : this.user?.user?.student?.id,
    photo : photo,
    type :"student"
  };
  console.log(data);
  
  //return 0;
  this.loading = true;
  this.api.postDataAuth("update_photo", data).subscribe(
    (res) => {
      console.log("res", res);
      this.userObject = res;
      this.loading = false;
      this.user.user = this.userObject.data;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      //...
    },
    (err) => {
      this.loading = false;
      //...
    }
  );
}



getFile(fileInput: any) {
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
            this.response = rs;
              const img_height = this.response.currentTarget['height'];
              const img_width = this.response.currentTarget['width'];

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
                  //this.cardImageBase64 = imgBase64Path;
                  this.student.cv = imgBase64Path;
                  ///this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

updateProfile(){
  //console.log("image", photo);
  this.student.student = this.user?.user?.student?.id;
  this.student.user = this.user?.user?.id,
  this.student.type = "student";
  
  //return 0;
  this.loading = true;
  this.api.postDataAuth("update_profile", this.student).subscribe(
    (res) => {
      console.log("res", res);
      this.userObject = res;
      this.loading = false;
      this.user.user = this.userObject.data;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.notice.success("Profil modifié avec success", "Profil");

      //...
    },
    (err) => {
      this.loading = false;
      //...
    }
  );
}

setStudent(){
  this.user = JSON.parse(localStorage.getItem('user') || '{}');
  this.student.first_name = this.user?.user?.student?.first_name;
  this.student.last_name = this.user?.user?.student?.last_name;
  this.student.bio = this.user?.user?.student?.bio;
  this.student.classe = this.user?.user?.student?.classe;
  this.student.gender = this.user?.user?.student?.gender;
  this.student.address = this.user?.user?.student?.address;
  this.student.phone = this.user?.user?.student?.phone;
  this.student.birth = this.user?.user?.student?.birth;
  this.student.school = this.user?.user?.student?.school_id;
}

updatePassword(){
  if(this.security.old.length < 6){
    this.notice.error("Veuillez renseigner un ancien mot de passe d' au moins 6 caractères", "Sécurité");
  }
  else if(this.security.new.length < 6){
    this.notice.error("Votre nouveau mot de passe au moins 6 caractères", "Sécurité");
  }
  else if(this.security.new != this.security.confirm){
    this.notice.error("Votre nouveau mot de passe doit correspondre à votre mot de passe confirmé", "Sécurité");
  }
  else{
    this.loading = true;
    this.api.postDataAuth("update_password", this.security).subscribe(
      (res) => {
        console.log("res", res);
        this.optionsPassword = res;
        this.loading = false;
        if(this.optionsPassword.status=="201"){
          this.notice.error("Votre ancien mot de passe ne correspond pas à celui rataché à ce compte", "Sécurité");
        }
        if(this.optionsPassword.status=="200"){
          this.notice.success("Mot de passe changé avec success", "Sécurité");
        }
        //...
      },
      (err) => {
        this.loading = false;
        //...
      }
    );
  }
}

}

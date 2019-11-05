export class PersonModel {
    
    id:String;
    name:String;
    lastname:String;
    dateofbirth:Date;
    sex:String;
    email:String;
    created:Date;

    constructor(){
        this.sex='Man';
    }
}
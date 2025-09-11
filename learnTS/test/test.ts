class User{
    name: String;
    constructor(_name:string){
        this.name = _name
    }
}

const tom : User = new User("Том");
let hello: string = "hello world";
console.log(hello, tom.name)//вот так вот lf
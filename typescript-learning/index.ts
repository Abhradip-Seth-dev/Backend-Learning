// primitives
let user : string = "Abhradip";
let age : number = 20;
let isActive : boolean = true;

//Arrays

let skills :string[] = ['coding','sports','drwing'];
let scores : number[] = [12,30,20];

// Any (using this makes no sense then why tf you use ts?)

let value : any= 20;
value = 'twenty';

// Unknown  ( Safer version of Any)

let input : unknown = getUserInput();

// writing fucntions

function logMessage(msg:string):void{
    console.log("Hello");
}
function getUserInput():void{
    console.log("Hello Friends");
    
}

// Never — function never returns (throws or infinite loop)
function throwError(msg: string): never {
    throw new Error(msg)
  }


  //custom types 
type userRole = 'user' | 'decoretor' | 'admin';

let role1 :userRole = 'decoretor'


type User={
    name:string,
    email:string,
    id:string,
    role:userRole,
    age?:number, //optional
}
interface UserInterface{
    name:string,
    email:string,
    id:string,
    role:userRole,
    age?:number, //optional
}

interface Admin extends UserInterface{
    permissions:string[],
}

const user1: User = {
    id: "123",
    name: "Abhradip",
    email: "ab@gmail.com",
    role: "admin"
    // age is optional so we can skip it
  }
const user2: User = {
    id: "345",
    name: "lw",
    email: "ab@gmail.com",
    role: "user"
    // age is optional so we can skip it
  }

// gernerics

function getFirst<T>(arr:T[]): T {
    return arr[0]
}

getFirst<string>(['gsd','dsg']);
getFirst<number>([5,2]);
getFirst<User>([user1,user2]);
//this file contains all the interfaces for the server



interface ServerItemBase
{
    name: string;
    id: number;
    parent?:ServerFolder
    server:number

    }

interface ServerItem extends ServerItemBase {
    type: string,
    name: string,
    thumbnail: string,
    filetype: string,
    file:string
}


interface ServerFolder  extends ServerItemBase
{
   
   
}


interface ServerFile extends ServerItemBase
{
    thumbnail?: string,
}


interface Server 
{
    id: number;
    name: string;
    description?: string;
    shortdesc?: string;
    icon?: string;
    type?:number
}
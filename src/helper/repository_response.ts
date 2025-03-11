export interface RepositoryResponseInterface {
   code : number,
   data : any,
   error : Error | { [type: string]: any},
}
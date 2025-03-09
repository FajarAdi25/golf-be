export interface ServiceResponseInterface {
   code : number,
   data : any,
   error : Error| { [type: string]: any} | null,
}
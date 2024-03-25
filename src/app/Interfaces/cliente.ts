export interface Cliente {
    id: number,
    nombres: string,
    apellidos: string,
    fechaDeNacimiento?: string,
    cuit:string,
    domicilio?:string,
    telefonoCelular:string,
    email:string
}

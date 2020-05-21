export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || (location.protocol + '//' + 'localhost:8080/api');  
    static USERS: any = {
        logIn: '/v1/users',
    }
}
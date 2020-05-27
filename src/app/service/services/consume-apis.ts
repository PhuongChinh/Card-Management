export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || ('http://' + 'localhost:8080/api');  
    static USERS: any = {
        LOGIN: '/v1/userCtrl/login',
        USERS: '/v1/users'
    }

    static CUSTOMER: any = {
        CUSTOMERS: '/v1/customers',
    }

    static ORDER: any = {
        CREATE_ORDER: '/v1/orderCtrl/createOrUpdateOrder',
        GET_ORDER_BY_CUSTOMER_ID: '/v1/orderCtrl/getOrderByCutomerId',
        ASSIGN_JOB: '/v1/orderCtrl/assignJobForWorker',
        PHASE_WORKER_OF_ORDER: '/v1/orderCtrl/getPhaseWorkerOfOrder',
        CONFIRM_COMPLETED_JOB: '/v1/orderCtrl/confirmWorkerCompletedPhase'
    }
}
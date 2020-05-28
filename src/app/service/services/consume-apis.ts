export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || ('http://' + '18.223.0.116:8080/api');  
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
        GET_ALL_ORDER: '/v1/orderCtrl/getAllOrder',
        ASSIGN_JOB: '/v1/orderCtrl/assignJobForWorker',
        PHASE_WORKER_OF_ORDER: '/v1/orderCtrl/getPhaseWorkerOfOrder',
        CONFIRM_COMPLETED_JOB: '/v1/orderCtrl/confirmWorkerCompletedPhase',
        GET_EACH_USER_WORKING: '/v1/orderCtrl/getPhaseWorkerByWorkerId'
    }
}
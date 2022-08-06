export const DNS = {
    host: 'http://satic.cali.gov.co:9292/'
}

export const ROUTES = {
    LOGIN:`${DNS.host}api/user/singin`, //POST /api/user/singin
    // POST /api/user/singup
    NEWTICKET:`${DNS.host}api/tickets/new_ticket`,
    REGISTERSENSORCITIZEN: `${DNS.host}api/user/movil/register/usersensorhumano`,
    GETALERTSRISK: `${DNS.host}api/tickets/tickets`,
    GETMEALERTRISK: `${DNS.host}api/tickets/showbyuser`,
    GETHISTORYSTATION: (id: number) => `${DNS.host}api/estaciones/historico_data/${id}`
}
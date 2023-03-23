class servicios {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into servicios (nombre, precio) values (?, ?)"; 

        var params = [];

        params.push(jsonData["nombre"]);  
        params.push(jsonData["precio"]); 

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {
         var sql = "select idSer, nombre, precio from servicios where estatus!=0";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " and idSer = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update servicios set nombre = ?, precio = ? where idSer = ?";

        var params = [];

        params.push(jsonData["nombre"]);  
        params.push(jsonData["precio"]); 
        params.push(resourceId); 

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "update servicios set estatus=0 where idSer = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = servicios;

class productos {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into productos (nombre,precio,existencias) values (?, ?, ?)"; 

        var params = [];

        params.push(jsonData["nombre"]);  
        params.push(jsonData["precio"]); 
        params.push(jsonData["existencias"]); 
        params.push(jsonData["estatus"]); 
        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

         var sql = "select idPr, nombre, precio, existencias from productos where estatus!=0";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " and idPr = ?";               
             params.push(resourceId);
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update productos set nombre = ?, precio = ?, existencias = ? where idPr = ?";

        var params = [];

        params.push(jsonData["nombre"]);  
        params.push(jsonData["precio"]); 
        params.push(jsonData["existencias"]);
        params.push(resourceId);

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "update productos set estatus=0 where idPr = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = productos;

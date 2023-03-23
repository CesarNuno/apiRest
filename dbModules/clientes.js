class clientes {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into clientes (usuario, contrasena, telefono, correo, direccion) values (?, ?, ?, ?, ?)"; 

        var params = [];

        params.push(jsonData["usuario"]);  
        params.push(jsonData["contrasena"]);
        params.push(jsonData["telefono"]); 
        params.push(jsonData["correo"]); 
        params.push(jsonData["direccion"]); 

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

         var sql = "select idCl, usuario, contrasena, telefono, correo, direccion from clientes where estatus!=0";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " and idCl = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update clientes set usuario = ?, contrasena = ?, telefono = ?, correo = ?, direccion = ? where idCl = ?";

        var params = [];

        params.push(jsonData["usuario"]);  
        params.push(jsonData["contrasena"]); 
        params.push(jsonData["telefono"]); 
        params.push(jsonData["correo"]); 
        params.push(jsonData["direccion"]); 
        params.push(resourceId); 

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "update clientes set estatus=0 where idCl = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = clientes;

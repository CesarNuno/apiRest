class usuarios {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into usuarios (usuario, contrasena,nombre, estatus) values (?, ?, ?, ?)"; 

        var params = [];

        params.push(jsonData["usuario"]);  
        params.push(jsonData["contrasena"]); 
        params.push(jsonData["nombre"]);  
        params.push(jsonData["estatus"]);  
        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

         var sql = "select idUs, usuario, contrasena, usuarios.nombre, nivel.nombre from usuarios INNER JOIN nivel ON usuarios.estatus = nivel.idNiv where estatus!=3";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " and idUs = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        var sql = "update usuarios set usuario = ?, contrasena = ?, nombre = ? where idUs = ?";

        var params = [];

        params.push(jsonData["usuario"]);  
        params.push(jsonData["contrasena"]); 
        params.push(jsonData["nombre"]);  
        params.push(resourceId); 

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "update usuarios set estatus=3 where idUs = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = usuarios;

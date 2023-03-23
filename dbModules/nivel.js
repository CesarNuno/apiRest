class nivel {

    constructor(dg) {
        this.dg = dg;        
    }
    
    getRecords(resourceId, callBack) {

         var sql = "select product_id, product_name, retail_price from products";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " where product_id = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }
}

module.exports = nivel;

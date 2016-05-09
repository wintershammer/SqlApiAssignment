var mysql   = require("mysql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Please use the API to query the database!"});
    });

    router.get("/customers",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["customers"];
        //var specific = !(req.query.customerNumber === '');
        if(req.query.customerNumber){
            query = "SELECT * FROM customers WHERE customerNumber=?";
            table = [req.query.customerNumber];
        }
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "customers" : rows});
            }
        });
    });


    router.post("/customers",function(req,res){
        var query = "INSERT INTO customers VALUES (?,?)";
        var table = [req.query.customerNumber,req.query.customerName];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Added customer with id" + req.query.customerNumber});
            }
        });
    });

    router.put("/customers",function(req,res){
        var query = "UPDATE customers SET customerName = ? WHERE customerNumber=?";
        var table = [req.query.value,req.query.customerNumber];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Updated customer with id" + req.query.customerNumber});
            }
        });
    });

    router.delete("/customers",function(req,res){
        var query = "DELETE from customers WHERE customerNumber=?";
        var table = [req.query.customerNumber];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted customer with id "+req.query.customerNumber});
            }
        });
    });
}

module.exports = REST_ROUTER;

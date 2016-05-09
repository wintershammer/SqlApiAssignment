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
        var query = "SELECT * FROM customers";
        var table = ["customers"];
        var specific = !(req.query.customerNumber === '');
        if(specific){
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
        var query = "INSERT INTO customers VALUES (?,?,?,?)";
        var table = [req.body.customerNumber,req.body.customerName,req.body.customerLastName,req.body.phone];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Added customer with id" + req.params.customerNumber});
            }
        });
    });

    router.put("/customers",function(req,res){
        var query = "UPDATE customers SET ? = ? WHERE customerNumber=?";
        var table = [req.body.attribute,req.body.values,req.body.customerNumber];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Updated customer with id" + req.params.customerNumber});
            }
        });
    });

    router.delete("/customers",function(req,res){
        var query = "DELETE from customers WHERE customerNumber=?";
        var table = [req.params.customerNumber];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "ERROR"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted customer with id "+req.params.customerNumber});
            }
        });
    });
}

module.exports = REST_ROUTER;

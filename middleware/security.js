exports.setCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    //es.header("Babylon", "DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

    next();
};
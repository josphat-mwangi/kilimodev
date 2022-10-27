const mongoose = require('mongoose');

exports.connect = async () =>{
    const DBURI='mongodb+srv://nodeauth:Jopa4567@cluster0.mzll5cv.mongodb.net/?retryWrites=true&w=majority'
    await mongoose
        .connect(DBURI, { useNewUrlParser: true })
        .then(()=> console.log("DB1 connecton Successful "))
        .catch((err)=>{
            console.log(err)
        })
}
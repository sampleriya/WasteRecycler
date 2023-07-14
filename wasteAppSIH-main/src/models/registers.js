const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    pincode: {
        type: String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique:true

    },
    gender:{
        type: String,
       


    },
    phone:{
        type: Number,
        required:true,
        unique: true
    },
    
    message:{
        type: String,
        required:true,
        
    },
    password:{
        type: String,
        required: true


    },
    confirmpassword:{
        type: String,
        required: true


    }


})

employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
       
        console.log(`${this.password}`);
        this.password = await bcrpyt.hash(this.password, 10);
        console.log(`${this.password}`);

        this.confirmpassword = undefined;
        
    }
    next();
  
})

const Register = new mongoose.model("Register",employeeSchema)

module.exports= Register;
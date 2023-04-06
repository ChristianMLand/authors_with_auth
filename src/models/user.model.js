import { Schema, model, models } from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username : { 
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"]
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    }
}, { timestamps: true });
// set confirmPassword as a virtual field so it doesn't get stored in DB
UserSchema.virtual("confirmPassword") 
    .get(function() { return this._confirmPassword })
    .set(function(val) { return this._confirmPassword = val });
// validate that password and confirm password match when registering
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) { 
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
// hash the password before storing in db
UserSchema.pre('save', function(next) { 
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
// define a static method for our model to handle login validations
UserSchema.statics.checkLogin = function({ email, password }) { 
    return this.findOne({ email }).then(async user => {
        if (!(user && await bcrypt.compare(password, user.password))) {
            throw new this().invalidate("password", "Invalid Credentials");
        }
        return user;
    });
}
// models can't be registered more than once, so need to check if already registered
export default models.User || model('User', UserSchema); 
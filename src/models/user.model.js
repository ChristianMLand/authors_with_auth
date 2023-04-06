import { Schema, model, models, Error } from 'mongoose';
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

UserSchema.virtual("confirmPassword") // set confirmPassword as a virtual field so it doesn't get stored in DB
    .get(function() { return this._confirmPassword })
    .set(function(val) { return this._confirmPassword = val });

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) { // validate that password and confirm password match when registering
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) { 
    bcrypt.hash(this.password, 10) // hash the password before storing in db
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.statics.login = function({ email, password }) { // define a static method for our model to handle login validations
    return this.findOne({ email }).then(user => {
        const errors = new Error.ValidationError(this);
        if (!(user && bcrypt.compare(password, user.password))) {
            errors.errors["password"] = new Error.ValidatorError({ // since we show same message for email/password, path is arbitrary
                path: "password",
                message: "Invalid Credentials"
            });
            throw errors;
        }
        return user;
    });
}

export default models.User || model('User', UserSchema); // models can't be registered more than once, so need to check if already registered
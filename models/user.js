import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true,'Email already exists'], 
        required: [true,'Email is required'],
    },
    username: {
        type: String,
        required: [true,'Username is required'],
        match: [/^(?=.{3,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

//Below code is for regular, always on, always running backend server, but different in NextJs
/*const User = model("User", UserSchema);
export default User;*/

//In NextJS, if User already there, then reassign that model instead of recreating a new one, else create new one
const User = models.User || model("User", UserSchema);
export default User;
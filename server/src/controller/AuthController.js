const User = require("../model/userModel");
const bcrypt = require("bcrypt"); 

//randdom string genartor 

let genarateToken = () => {
  const length = 10 ; 
  const characters = 'ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Attempting to register user:", { name, email });

        if (!name || !email || !password) {
            return res
                .status(400)
                .send({ message: "Name, email, and password are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword , token: genarateToken()});
        await newUser.save();

        res.status(201).send({ token: newUser.token});
        console.log("New user registered successfully:", newUser);

        
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password." });
        }

        const token = genarateToken(); 
        user.token = token;
        await user.save();

        res.status(200).send({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const Logout = async (req, res ) => {
  const uid = req.headers.uid;
  const user = await User.findOne({ uid }); 
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }else{
    user.token = "";
    user.save();
    return res.status(200).send({ message: "Logged out successfully" });
  }
}

let sessionVarifier = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    const user =  User.findOne({ token });
    if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = user;
    next();
};
module.exports = { Register, Login  , Logout};

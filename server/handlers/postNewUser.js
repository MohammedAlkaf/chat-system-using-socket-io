const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// *************************************************************************
// This handler function is used to handle adding a new user to the database
// It's endpint is called when a new user signs up from the sign-up page
// *************************************************************************

const postNewUser = async (req, res) => {
    try {
        // Destructing the user inputs for validations
        const { 
            displayName,
            email,
            password,
            confirmPassword,
            avatarUrl
        } = req.body;

        const query = { email };

        // Write the date in ISO format YYYY-MM-DDTHH:mm:ss.sssZ
        const d = new Date();
        let todayDate = d.toISOString();

        // add the new data user data with all other initial values for a new user
        const newUserInfo = 
        { ...req.body,
            _id: uuidv4(), // create a new _id for the new user
            joined: todayDate,
        }

        
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        console.log("connected");
        const db = client.db("chatSystem");

        const result = await db.collection("users").find(query).toArray();

        if(result.length !== 0){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo,  message: "An Account with the Provided Email Already Exists"})
        }

        // Validate the users inputs
        if( password === "" || password === undefined ){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo,  message: "Your password is missing"})
        }
        else if( password !== confirmPassword ){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo,  message: "Passwords don't match"})
        }
        else if( displayName === "" || displayName === undefined){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo,  message: "Your display name is missing"})
        }
        else if ( email === "" || email === undefined){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo, message: "Your email is missing"})
        }
        else if ( avatarUrl === "" || avatarUrl === undefined){
            client.close();
            console.log("disconnected");
            return res.status(400).json({ status: 400, result:newUserInfo, message: "Your AvatarUrl is missing"})
        }

        await db.collection("users").insertOne(newUserInfo);

        client.close();
        console.log("disconnected");

        // if all inputs pass the validation, then allow the user to create the new account
        return res.status(200).json({ status: 200, result: newUserInfo, message: "User info has been added"})

    } catch (err) {
        console.log("Error", err)
    }
};

module.exports = { postNewUser }
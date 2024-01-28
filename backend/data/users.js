import bcrypt from "bcryptjs";
const users=[
    {
        name:'Yash',
        email:'yashmht44@gmail.com',
        password:bcrypt.hashSync('2241164','10'),
        isAdmin:true,
    },
    {
        name:'Balaji',
        email:'balajidnz295@gmail.com',
        password:bcrypt.hashSync('2241121','10'),
        isAdmin:true,
    },
    {
        name:'User1',
        email:'user1@gmail.com',
        password:bcrypt.hashSync('userpassword','10'),
        isAdmin:flase,
    },
    {
        name:'User2',
        email:'user2@gmail.com',
        password:bcrypt.hashSync('userpassword','10'),
        isAdmin:false,
    }
];

export default users;

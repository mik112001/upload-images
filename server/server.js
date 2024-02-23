import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors(
    {
        origin: ["http://localhost:5174"],
        methods: ['POST','GET'],
        credentials: true
    }
));
    
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'upload_images'
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images')
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage : storage
});

app.post('/upload' , upload.single('image'),(req,res) => {
    const image = req.file.filename;
    const sql = "INSERT into `images`(`image`) VALUES (?)";
    db.query(sql, [image] , (err,result) => {
        if(err) return res.json({Message:'Error'});
        return res.json({Status: 'Success'});
    })
});

app.get('/image' , (req,res) => {

});

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message:"We need token please provide it."});
    }
    else {
        jwt.verify(token, "our-jsonwebtoken-secret-key" , (err,decode) => {
            if(err) {
                return res.json({Message:"Authentication Needed"});
            }
            else {
                req.username = decode.username;
                next();
            }
        })
    }
}

app.get('/', verifyUser ,(req,res) => {
    return res.json({Status:'Success', username:req.username});
});

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE username = ? and password = ?";
    db.query(sql, [req.body.username , req.body.password] , (err,data) => {
      if(err) return res.json({Message:'Server Side Error!!'});
      if(data.length > 0) {
        const username = data[0].username;
        const token = jwt.sign({username}, "our-jsonwebtoken-secret-key" , {expiresIn : '1D'});
        console.log('token',token);
        res.cookie('token',token ,{httpOnly: true});
        return res.json({Status: 'Success'});
      }
      else {
        return res.json({Message:'NO Record Exists!!'});
      }
    })
});

app.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.json({Status: 'Success'});
});

app.post('/signup', (req,res) => {
    const sql = "INSERT INTO `login`(`username`, `password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.password
    ];
    db.query(sql, [values] , (err,data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
});

app.listen(8081, () => {
    console.log("Running");
})
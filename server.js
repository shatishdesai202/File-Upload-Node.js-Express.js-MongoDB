const express = require('express');

const path = require('path');

const app = express();

var bodyParser = require('body-parser');

const multer = require('multer');

const uploadModel = require('./database');

var getImage = uploadModel.find();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

// app.use(express.static(__dirname + "./public"));
app.use('/static', express.static(path.join(__dirname, 'public')));
var storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage,

}).single('file');

app.get('/', upload, (req, res, next) => {
    getImage.exec( (err, doc)=>{
        if (err) throw err;

        res.render('form', { title: 'image upload in node', success: '', image:doc});
    });

});

app.post('/', upload, (req, res, next) => {

    var imageFile = req.file.filename;

    var imageDetail = new uploadModel({
        imagename : imageFile
    });

    imageDetail.save( (err, doc)=>{
        if(err){
            throw err;
        }else{
            var success = req.file.filename + ' Uploaded Successfully ';
            getImage.exec( (err, doc)=>{
                if (err){ throw err;}
                else{
                    res.render('form', {
                        title: 'image upload in node',
                        success: success,
                        image:doc
                    });
                }
            });   
        }
    });
});

app.listen(3000, () => {
    console.log('server running at 3000');
});
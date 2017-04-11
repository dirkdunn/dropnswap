var express = require('express');
var router = express.Router();
var fs = require('fs');
var mkdirp = require('mkdirp');

router.post('/upload', function(req, res, next){
  var username = 'johnnyb123',
    addFile = function(username, filename, file){
      /* Create a write stream, and pipe the file into it.
         This will not create duplicates */
      fstream = fs.createWriteStream(__dirname + '/../files/' + username + '/' + filename);
      file.pipe(fstream);
      fstream.on('close', function () {
          res.status(200).send(true);
      });
    };

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      fs.exists(__dirname+'/../files/'+username+'/'+filename, function(exists){
        if(exists){
          addFile(username,filename,file);
        } else {
          mkdirp(__dirname+'/../files/'+username, function (err) {
              if (err) console.error(err)
              addFile(username,filename,file);
          });
        }
      });
  });

})

router.post('/download',function(req,res,next){

  var username = 'johnnyb123',
    fileToSend = __dirname + '/../files/' + username + '/' + req.body.filename;

  console.log('FILE PATH: ', fileToSend);

  fs.exists(fileToSend, function(exists){
    if(exists){
      res.download(fileToSend);
    } else {
      res.status(404).send('User Directory Or File Not Found');
    }
  });

});


router.get('/getFiles',function(req,res,next){
  var username = 'johnnyb123',
    userDirectory = __dirname + '/../files/' + username;

  fs.exists(userDirectory,function(exists){
    if(exists){
      fs.readdir(userDirectory,function(err,files){
        if(err) console.log(err);
        res.json(files);
      });
    } else {
      res.json([]);
    }
  });

});

// console.log("Uploading: " + filename);
// console.log('file is: ', file);
// console.log('fieldname is: ', fieldname);
// console.log('__dirname is: ',__dirname);
// console.log('typeof file: ', typeof file)


module.exports = router;

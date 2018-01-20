const router = require('express').Router();
const explorer = require('../helper/file-explorer');

// for Windows
explorer.rootPath = "C:/Users/";


router.get('/:path?', (req, res, next) => {

  let path = "";

  if (req.params.path)
    path = explorer.fixPath(req.params.path);

  // Check
  if (path.slice(0, 3) == '+..') {
    path = "";
  }

  // Convert Url to Path
  dirPath = explorer.rootPath + (path != "" ? path.split('+').join('/') : "");


  // Trigger File Explorer and return Navigation Data
  const nav = explorer.default(dirPath, path);

  res.render('index', {
    title: 'File Explorer',
    dir: explorer.jsonDir,
    rootPath: explorer.rootPath,
    path,
    nav
  });


});

module.exports = router;

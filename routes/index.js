const router = require('express').Router();
const explorer = require('../helper/file-explorer');

// for Windows
explorer.rootPath = "C:/Users/";


router.get('/:path?', (req, res, next) => {

  let path = "";

  if (req.params.path)
    path = req.params.path;

  // Check
  if (path.indexOf('..') > -1 && path.indexOf('..') < 2)
    path = "";


  // Convert Url to Path
  dirPath = explorer.urlToPath(path);


  // Trigger File Explorer and return Navigation Data
  const nav = explorer.default(dirPath, path);

  res.render('index', {
    title: 'File Explorer',
    dir: explorer.jsonDir,
    path,
    nav
  });


});

module.exports = router;

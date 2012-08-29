
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('Rendering index');
  res.render('index', { title: 'Express' })
};

exports.video = function(req, res){
  console.log('Rendering video');
  res.render('video', { title: 'Video'});
};
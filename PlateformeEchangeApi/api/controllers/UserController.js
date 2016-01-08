/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  ////Create user
  //create: function (req, res) {
  //  if( req.method=="POST" && req.param("User",null) !=null)
  //  {
  //    User.create(req.param("User"), function(err,user){
  //      // Error handling
  //      if (err) {
  //        res.send("Error:Sorry!Something went Wrong");
  //      }else {
  //        //res.send("Successfully Created!");
  //        res.redirect( 'user/view/'+user.id);
  //      }
  //    });
  //  }
  //  else
  //  {
  //    res.render( "user/create");
  //  }
  //},
  //
  ////List users
  //index: function (req, res) {
  //  User.find().exec(function(err, users) {
  //    res.render( 'user/index',{'users':users});
  //    return;
  //  });
  //},
  //
  ////Show user
  //view: function (req, res) {
  //  var id=req.param("id",null);
  //  User.findOne(id,function(err,model){
  //    res.render( 'user/view',{'model':model});
  //  });
  //},
  //
  ////Update User
  //update: function (req, res) {
  //  var id=req.param("id",null);
  //  console.log("test" + req.param);
  //  if(req.method=="POST")//&&req.param(User,null)!=null)
  //    {
  //      console.log("update post");
  //      var p=req.param(User,null);
  //      console.log(req.param);
  //      user.name=p.name;
  //      user.save(function(err){
  //        if (err) {
  //          res.send("Error");
  //        }else {
  //          res.redirect('user/view/'+user.id);
  //        }
  //      });
  //    }
  //    else
  //    {
  //      console.log("update else");
  //      User.findOne(id,function(err,user){
  //      res.render( 'user/update',{'user':user});
  //  });
  //    }
  //},
  //
  //
  ////delete user
  //delete: function (req, res) {
  //  var id=req.param("id",null);
  //  User.findOne(id,function(err, user) {
  //    user.destroy(function(err) {
  //    res.redirect( 'user/index/');
  //    });
  //  });
  //},
  //
  //    //registration user
  //registration: function (req, res) {
  //  if( req.method=="POST" && req.param("User",null) !=null){
  //
  //  }
  //  // res.redirect( 'user/registration/');
  //
  //}

};



const Post = require('../models/post');
const Comment = require('../models/comment');

//old code
// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('Error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }

//async code
module.exports.create = async function(req,res){
    
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        //checking if the req is ajax; ajax reqs are usually xml-http req ie. xhr
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
                
            }); 
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
  

}

//old code
// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the onject id into string. This functionality is provided by mongoose
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


//async code

module.exports.destroy = async function(req, res){
    
    try{
        let post = await Post.findById(req.params.id);

    // .id means converting the onject id into string. This functionality is provided by mongoose
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');

        }else{
            req.flash('error', 'This post cannot be deleted');
            return res.redirect('back');
        }
        
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
  
    
}
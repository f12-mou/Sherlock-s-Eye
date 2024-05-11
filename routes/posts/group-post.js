const router = require('express').Router();
const DB_group_post = require('../../Database/posts/DB-group-post-api');
const DB_auth = require('../../Database/DB-auth-api');
//add group post
router.post('/:group_id', async (req,res)=>{   
    await DB_group_post.addGroupPost(req.body, req.user.USER_ID, req.params.group_id);
    res.redirect(`/api/group/${req.params.group_id}`);
});

//update group post
router.post('/update/:post_id',async (req,res)=>{
    await DB_group_post.updateGroupPost(req.body, req.params.post_id);
    res.redirect(`/api/group_post/${req.body.group_id}/${req.params.post_id}`);
});

//delete group post
router.post('/delete/:post_id',  async(req,res)=>{
    await DB_group_post.deleteGroupPost(req.params.post_id);
    res.redirect(`/api/group/${req.body.group_id}`);
});

//get all post
router.get('/all/:group_id', async(req,res)=>{
    console.log('finally here');
    res.send(await DB_group_post.getGroupPostsSortedByNewest(req.user.USER_ID, req.params.group_id));
});

//search post
router.get('/search/:group_id',  async(req, res)=>{
    res.send(await DB_group_post.searchGroupPosts(req.user.USER_ID, req.params.group_id, req.query.str));
});

//get a particular group post
router.post('/:group_id', async(req, res)=>{
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    console.log(result[0].USER_ID, req.params.group_id, req.params.post_id);
    const group_post = await DB_group_post.searchGroupPosts(result[0].USER_ID, req.params.group_id,req.params.post_id);
    console.log(group_post);
    res.render('layoutWithoutUser.ejs', {
            title : 'Group Post',
            body2 : ['posts/group-post'],
            group_post: group_post,
            cur_user_id: result[0].USER_ID,
            group_id: req.params.group_id,
            user: result[0]
        });
});

// router.get('/search',  async(req, res)=>{
//     const whoNowUser=req.session.isLoggedIn;
//     let result;
//     result = await DB_auth.getLoginInfoByEmail(whoNowUser);
//     const blogs = await DB_group_post.searchGroupPosts(result[0].USER_ID, req.query.search);
//     res.render(
//         'layoutWithoutUser.ejs', {
//             title : 'Searched Group Posts',
//             body2 : ['posts/group-post'],
//             blogs: blogs,
//             cur_user_id: result[0].USER_ID,
//             user:result[0]
//         }
//     )
// });

module.exports = router;
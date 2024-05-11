const router = require('express').Router();
const DB_blog = require('../../Database/posts/DB-blog-api');
const DB_auth = require('../../Database/DB-auth-api');
// const { verify } = require('../../middlewares/user-verification');
// const { verifyAccessToUpdatePost, verifyAccessToDeletePost } = require('../../middlewares/post-verification');

router.post('', async (req,res)=>{   
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    const result2 = await DB_blog.addBlog(req.body, result[0].USER_ID);
    console.log(req.body);
    res.redirect('/api/blog/all');
});

router.post('/update/:post_id', async (req,res)=>{
    const result = await DB_blog.updateBlog(req.body, req.params.post_id);
    res.redirect('/api/blog/all');
});

router.post('/delete/:post_id', async(req,res)=>{
    const result = await DB_blog.deleteBlog(req.params.post_id);
    console.log('in deleting blog post function '+req.params.post_id);
    res.redirect('/api/blog/all');
});

router.get('/all',async(req,res)=>{
    let blogs = [], title='All Blogs';
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    if (req.query.sort === 'mostPopular') {
        blogs = await DB_blog.getBlogsSortedByMostPopular(whoNowUser);
        title = 'Popular Blogs';
    }
    else blogs = await DB_blog.getBlogsSortedByNewest();
    console.log(blogs);
    res.render('layoutWithoutUser.ejs', {
            title : title,
            body2 : ['posts/blogs'],
            blogs: blogs,
            user: result[0]
        });
});

// router.get('', verify, async (req, res) => {
//     let user_id = req.user.USER_ID;
//     if(req.query.user_id) user_id = req.query.user_id;
//     const blogs = await DB_blog.getBlogsByUserId(user_id, req.user.USER_ID);
//     res.render('layoutWithoutUser.ejs', {
//             title : 'My Blogs',
//             body : ['posts/blogs'],
//             blogs: blogs,
//             cur_user_id: user_id
//         })
// });

// router.get('/search', verify, async(req, res)=>{
//     const blogs = await DB_blog.searchBlogs(req.user.USER_ID, req.query.search);
//     res.render(
//         'layoutWithoutUser.ejs', {
//             title : 'Searched Blogs',
//             body : ['posts/blogs'],
//             blogs: blogs,
//             cur_user_id: req.user.USER_ID
//         }
//     )
// });

// router.get('/suggestion', verify, async(req, res)=>{
//     const blogs = await DB_blog.suggestedBlogs(req.user.USER_ID);
//     res.render(
//         'layoutWithoutUser.ejs', {
//             title : 'Suggested Blogs',
//             body : ['posts/blogs'],
//             blogs: blogs,
//             cur_user_id: req.user.USER_ID
//         }
//     )
// });

// router.get('/:post_id', verify, async (req, res) => {
//     const blog = await DB_blog.getBlog(req.user.USER_ID, req.params.post_id);
//     res.render(
//         'layoutWithoutUser.ejs', {
//             title : 'Blog',
//             body : ['posts/blog'],
//             blog: blog,
//             cur_user_id: req.user.USER_ID
//         }
//     )
// });

router.get('/myBlogs',async(req,res)=>{
    let blogs = [], title='My Blogs';
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    blogs = await DB_blog.getBlogsByUserId(result[0].USER_ID,result[0].USER_ID);// await DB_blog.getBlogsSortedByNewest();
    console.log(blogs);
    res.render('layoutWithoutUser.ejs', {
            title : title,
            body2 : ['posts/my-blogs'],
            blogs: blogs,
            user: result[0]
        });
});


module.exports = router;
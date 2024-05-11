const router = require('express').Router();
const DB_group = require('../../Database/groups/DB-group-api');
const DB_group_post = require('../../Database/posts/DB-group-post-api');
const DB_group_member = require('../../Database/groups/DB-group-member-api');
const DB_auth = require('../../Database/DB-auth-api');
//create group
router.post('', async(req,res)=>{
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    await DB_group.createGroup(req.body, result[0].USER_ID);
    res.redirect('/api/group/all');
});

//update group admin
router.post('/updateAdmin/:group_id', async (req, res) => {
    await DB_group.updateGroupAdmin(req.params.group_id, req.body.admin_id);
    res.redirect(`/api/group/${req.params.group_id}`);
});

//update group info
router.post('/:group_id', async(req,res)=>{
    await DB_group.updateGroup(req.body, req.params.group_id);
    console.log('ok updated');
    res.redirect(`/api/group/${req.params.group_id}`);
});

//delete group
router.post('/delete/:group_id',  async(req, res)=>{
    await DB_group.deleteGroup(req.params.group_id);
    res.redirect('/api/group/all');
});

//get all groups
router.get('/all', async(req,res)=>{
    let groups = [];
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    groups = await DB_group.getGroups(result[0].USER_ID);
    console.log(groups);
    res.render('layoutWithoutUser.ejs', {
            title : 'All Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        });
});

router.get('/suggested', async(req,res)=>{
    let groups = [];
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    groups = await DB_group.getSuggestedGroups(result[0].USER_ID);
    res.render('layoutWithoutUser.ejs', {
            title : 'Suggested Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        });
});

//get my groups(only member)
router.get('/group_member', async(req,res)=>{
    let groups = [];
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    groups = await DB_group.getGroupsByUserId(result[0].USER_ID);
    console.log(groups);
    res.render('layoutWithoutUser.ejs', {
            title : 'My Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        });
});

//get my pending groups
router.get('/pending_member', async(req,res)=>{
    let groups = [];
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    groups = await DB_group.getPendingGroupsByUserId(result[0].USER_ID);
    res.render('layoutWithoutUser.ejs', {
            title : 'My Pending Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        });
});

//get my managed group
router.get('/admin', async(req,res)=>{
    let groups = [];
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    groups = await DB_group.getGroupsByAdminId(result[0].USER_ID);
    res.render('layoutWithoutUser.ejs', {
            title : 'My Managed Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        });
});

//search group
router.get('/search',  async(req,res)=>{
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    const groups = await DB_group.searchGroups(result[0].USER_ID, req.query.search);
    res.render(
        'layoutWithoutUser.ejs', {
            title : 'Searched Groups',
            body2 : ['groups/groups'],
            groups: groups,
            user : result[0],
            cur_user_id:result[0].USER_ID
        }
    )
});

//get a particular groupnp
router.get('/:group_id',  async (req, res) => {
    const whoNowUser=req.session.isLoggedIn;
    let result;
    result = await DB_auth.getLoginInfoByEmail(whoNowUser);
    const groups = await DB_group.getGroup(req.params.group_id, result[0].USER_ID);
    let members=await DB_group_member.getGroupMembers(req.params.group_id);
    let posts=await DB_group_post.getGroupPostsSortedByNewest(result[0].USER_ID, req.params.group_id);
    const group=groups[0];
    console.log(posts);
    res.render('layoutWithoutUser.ejs', {
            title : group.GROUP_NAME,
            body2 : ['groups/group'],
            group: group,
            user : result[0],
            cur_user_id:result[0].USER_ID,
            members:members,
            blogs:posts
        });
});
module.exports = router;
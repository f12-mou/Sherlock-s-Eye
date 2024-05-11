const router = require('express').Router();
const DB_group_member = require('../../Database/groups/DB-group-member-api');
const DB_group = require('../../Database/groups/DB-group-api');

//join request
router.post('/pending/:group_id', async(req,res)=>{
    await DB_group_member.addPendingMember(req.user.USER_ID, req.params.group_id);
    res.redirect(`/api/group/${req.params.group_id}`);
});

// get all pending members
router.get('/pending/group/:group_id' , async(req,res)=>{
    res.send(await DB_group_member.getPendingGroupMembers(req.params.group_id));
});

//pending accept, reject
router.post('/pending/:user_id/:status/:group_id', async(req,res)=>{
    await DB_group_member.processPendingMember(req.params.user_id, req.params.group_id, req.params.status);
    res.redirect(`/api/group/${req.params.group_id}`);
});

//removing my pending request
router.post('/pending/remove/:group_id',async(req,res)=>{
    await DB_group_member.processPendingMember(req.user.USER_ID, req.params.group_id, 'reject');
    res.redirect(`/api/group/${req.params.group_id}`);
});

//remove group member
router.post('/remove/group/:group_id/user/:user_id',  async(req, res)=>{
    await DB_group_member.deleteGroupMember(req.params.user_id, req.params.group_id);
    res.redirect(`/api/group/${req.params.group_id}`);
});

//leave group
router.post('/remove/group/:group_id',  async(req, res)=>{
    await DB_group_member.deleteGroupMember(req.user.USER_ID, req.params.group_id);
    res.redirect('/api/group/all');
});

//get all group members
router.get('/group/:group_id',  async(req,res)=>{
    console.log('holaaa in js file');
    let members=await DB_group_member.getGroupMembers(req.params.group_id);
    
    console.log(members);
    res.send(members);
    
});
router.get('',  async(req,res)=>{
    console.log('ekhane jhamels');
    
});

module.exports = router;
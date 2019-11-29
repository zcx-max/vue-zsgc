'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    //查询所有成员
    router.get('/list', controller.user.list)
        //添加
    router.post('/addlist', controller.user.addlist)
        //删除
    router.get('/dellist', controller.user.dellist)
        //修改
    router.post('/xiulist', controller.user.xiulist)

    //供react使用的列表接口
    router.get('/uselist', controller.user.uselist);


};
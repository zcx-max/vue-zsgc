const { Controller } = require('egg')

class UserController extends Controller {

    //查询所有成员
    //分页
    async list() {
        let { ctx, service } = this;
        let { pagenum = 1, limit = 3 } = ctx.query;
        let startIndex = (pagenum - 1) * limit;

        try {
            let data = await service.user.findlist(startIndex, limit)
            console.log(data, "分页")
            let total = await service.user.total();
            console.log(total[0]['count(*)']) //总条数，必须是total[0]['count(*)']
            ctx.body = { code: 1, data, total: total[0]['count(*)'] }

        } catch (e) {
            ctx.body = { code: 0, msg: e.message }
        }
    }

    async uselist() {
        let { ctx, service } = this;
        let data = await service.user.uselist()
        ctx.body = data;
    }

    //添加
    async addlist() {
        let { ctx, service } = this;
        let { name, password } = ctx.request.body;
        let result = await service.user.findname(name)
        if (!result) {
            try {
                await service.user.addlist(name, password)
                ctx.body = { code: 1, msg: '添加成功' }
            } catch (error) {
                ctx.body = { code: 0, msg: error.message }
            }

        } else {
            ctx.body = { code: 0, msg: '添加失败' }
        }
    }

    //删除
    async dellist() {
        let { ctx, service } = this;
        let { id } = ctx.query;
        let result = await service.user.findid(id)
        if (result) {
            await service.user.dellist(id)
            ctx.body = { code: 1, msg: '删除成功' }
        } else {
            ctx.body = { code: 0, msg: '删除失败' }
        }
    }

    //修改

    async xiulist() {
        let { ctx, service } = this;
        let { name, password, id } = ctx.request.body;
        let result = await service.user.findid(id)
        if (result) {
            await service.user.xiulist(name, password, id)
            ctx.body = { code: 1, msg: '修改成功' }
        } else {
            ctx.body = { code: 0, msg: '修改失败' }
        }
    }


}

module.exports = UserController;
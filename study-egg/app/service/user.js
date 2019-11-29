const { Service } = require('egg')

class UserService extends Service {
    //查询,分页
    async findlist(startIndex, limit) {
            return await this.app.mysql.query(`select * from list limit ${startIndex},${limit}`)
        }
        //供react使用
    async uselist() {
            return await this.app.mysql.select('list')
        }
        //查询总条数
    async total() {
            return await this.app.mysql.query('select count(*) from list')
        }
        //查询其中一条有没有这个名字
    async findname(name) {
            return await this.app.mysql.get('list', { name })
        }
        //查找id
    async findid(id) {
            return await this.app.mysql.get('list', { id })
        }
        //添加
    async addlist(name, password) {
            return await this.app.mysql.insert('list', { name, password })
        }
        //删除
    async dellist(id) {
            return await this.app.mysql.delete('list', { id })
        }
        //修改
    async xiulist(name, password, id) {
        return await this.app.mysql.update('list', { name, password, id })
    }

}

module.exports = UserService;
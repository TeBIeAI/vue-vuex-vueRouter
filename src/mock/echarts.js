import Mock from 'mockjs'
const count = 5
function socketData () {
    let List = []
    let nameList = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    for (let i = 0; i < count; i++) {
        List.push(
            Mock.mock({
                name: nameList[i],
                price: Mock.Random.float(0, 3000, 0, 0)
            })
        )
    }
    return List
}

export default {
    getEchartsSockets: config => {
        let arr = socketData()
        return {
            code: 200,
            userList: arr
        }
    }
}
const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', width: '50' },
    { type: 'index', label: '序号', width: '80' },
    { type: 'normal', label: '角色名称', prop: 'name' },
    { type: 'normal', label: '权限介绍', prop: 'intro' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '180' }
  ]
}

export default contentConfig

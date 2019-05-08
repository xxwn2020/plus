export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    /** TSPlust */
    finance: {
      root: '财务管理',
      wallet: '钱包管理',
      flow: '钱包流水',
      statistics: '统计'
    },
    management: {
      root: '管理',
      users: {
        root: '用户管理',
        list: '用户列表',
        recommend: '推荐用户',
        certificated: '认证用户',
        roles: '角色管理',
        abilities: '权限管理',
        edit: '编辑用户'
      },
      tags: {
        root: '标签管理',
        categories: '标签分类',
        list: '标签列表',
        add: '添加标签'
      },
      integral: {
        root: '积分管理'
      },
      certifications: {
        'add': '添加认证信息',
        'edit': '编辑认证信息'
      }
    },
    operation: {
      root: '运营管理',
      basic: '基础设置',
      sensitiveWords: '敏感词',
      areas: '地区管理',
      info: {
        root: '基本信息'
      },
      site: {
        root: '站点配置'
      },
      cache: {
        root: '缓存管理'
      }
    },

    system: {
      root: '系统配置',
      info: '系统信息',
      registerSetting: '注册设置',
      certification: '认证设置',
      thirdparty: '第三方登录',
      sms: {
        root: '短信配置',
        list: '短信列表',
        config: '短信配置'
      },
      user: {
        root: '用户设置'

      },
      cors: {
        root: '跨域设置'
      },
      mailSetting: '邮件配置',
      payment: '支付配置',
      storage: {
        new: '新存储',
        root: '存储设置',
        basic: '基础设置',
        filesystems: '文件系统',
        channels: '频道设置'
      },
      cdn: {
        root: 'CDN管理'
      }
    }
    /** TSPlus */
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  /** TSPlus */
  /* 管理后台 */
  admin: {
    /* 公用部分 */
    operation: '更多操作',
    edit: '编 辑',
    success: '操作成功',
    notice: '提 示',
    confirm: '确 认',
    cancel: '取 消',
    canceled: '已取消',
    submit: '提 交',
    uname: '用户名',
    delete: '删 除',
    status: '状 态',
    all: '全 部',
    add: '添 加',
    category: '类 型',
    createdAt: '时间',
    upload: '请上传',
    startDateTime: '开始日期',
    endDateTime: '结束日志',
    updatedAt: '更新时间',
    idField: '编 号',
    filter: '筛 选',
    editTitle: '修改',
    addTitle: '新增',
    uid: '用户ID',
    username: '用户名',
    name: '真实姓名',
    phone: '手机号',
    identify: '证件号',
    type: '请输入',
    select: '请选择',
    correct: '正确的',
    formInvalid: '请完善表单后再提交',
    identifyPhoto: '证件照片',
    identifyFront: '正面',
    identifyBack: '背面',
    cdn: {
      root: 'CDN管理'
    },
    storage: {
      root: '存储设置',
      basic: {
        size: '文件大小控制',
        mime: '文件MIME类型控制',
        picture: '图片尺寸控制',
        dimension: '设置允许上传图片的尺寸信息，最小像素设置是为了避免用户上传过小图片影响布局，最大像素设置首先可以控制图片大小，其次第三方云储存均有最大尺寸限制。如果超出最大像素，第三方将不会进行图片处理，导致原图直接吐出。限制尺寸信息还有助于避免服务器错误，例如你是用 local 文件系统，进行图像裁剪的时候可以考虑到系统内存情况进行设置，不至于内存溢出。',
        maxWidth: '最大宽度',
        minWidth: '最小宽度',
        maxHeight: '最大高度',
        minHeight: '最小高度'
      },
      filesystems: {
        root: '文件系统',
        basic: '默认文件系统',
        basicIntro: '默认文件系统是用于在频道没有指定文件系统时候使用的默认文件系统。',
        local: '本地存储',
        AliOss: 'Ali OSS',
        disk: '使用磁盘',
        diskIntro: '如果不知道选什么，就选 「local」',
        expiresTime: '过期时间',
        eTIntro: '上传会话的有限时间，基本可以不用修改',
        expiresTimePlaceholder: '过期时间，单位秒'
      },
      channels: {
        root: '频道设置',
        publicChannel: '公开频道',
        locate: '本地存储',
        AliOss: '阿里云 OSS',
        channelIntro: '所有的频道文件系统不建议频繁修改，如果你需要修改，请将文件全部迁移到对应的文件系统后再进行修改！ 如果没有进行文件迁移就进行了文件系统切换，则切换完成后文件系统会抛出文件找不到的错误（仅非正式环境下，正式环境模式则返回 NULL）。',
        publicIntro: '公开频道关键词为 public，公开频道中 所存储的文件均为公开免费文件！主要适用场景为用户头像、背景图片以及系统文件 等场景。'
      }
    },
    tags: {
      root: '标签管理',
      list: '标签列表',
      category: '标签分类',
      name: '标签名称',
      weight: '权重(越大越靠前)',
      add: '新增标签',
      edit: '编辑标签',
      addCate: '新增分类',
      editCate: '编辑分类',
      taggableCount: '热度'
    },
    sms: {
      root: '短信配置',
      configure: {
        app_key: 'App Key',
        app_secret: 'App ',
        sign_name: '短信签名',
        api_key: 'Api Key',
        api_id: 'Api Id',
        template: '模版',
        content_tip: '输入应用 content 信息,例:你的短信验证是：:code，注:code为变量',
        access_key_id: 'App Key',
        access_key_secret: 'App Secret',
        content: '短信模板'
      }
    },

    mail: {
      root: '邮件配置',
      smtpAddress: 'SMTP主机地址',
      smtpPort: 'SMTP主机端口',
      mailAddress: '发件箱地址',
      mailName: '发件人名称',
      protocol: '传输协议加密方式',
      mailAccount: 'SMTP服务器用户名',
      mailPassword: 'SMTP服务器密码'
    },

    certifications: {
      root: '认 证',
      list: '认证用户列表',
      add: '新认证',
      category: '认证类型',
      description: '认证描述',
      orgName: '机构名称',
      orgAddress: '机构地址',
      create: '新增认证'
    },
    abilities: {
      root: '权限节点',
      list: '权限列表',
      name: '节点名称',
      displayName: '显示名称',
      description: '描 述',
      deleteAbility: '此操作将永久删除该权限, 是否继续?',
      add: '添加权限'
    },
    sensitive: {
      root: '敏感词',
      add: '新增敏感词'
    },
    roles: {
      root: '角色',
      management: '角色管理',
      add: '添加角色',
      default: '默认角色',
      registerDefault: '新用户默认的用户组',
      defaultRoleText: '选择用户注册的默认角色',
      deletedRoleWarn: '!!尽量不要删除用户角色!!, 否则会造成用户角色混乱！请谨慎编辑。'
    },
    /* 用户模块 */
    users: {
      create: '创建用户',
      disable: '禁 用',
      followEachOthers: '注册相互关注',
      followTa: '注册关注',
      cancelFollow: '取消关注设置',
      recommend: '推 荐',
      unrecommend: '取消推荐',
      edit: '编辑用户',
      restore: '取消禁用',
      phone: '手机号',
      email: 'Email',
      password: '账号密码',
      roles: '用户角色',
      userList: '用户列表',
      confirmDisable: '此操作将禁用该用户, 确认要继续?',
      continue: '继 续',
      name: '用户名',

      search: {
        userId: 'ID',
        sort: '排序方式',
        email: '电子邮箱',
        phone: '手机号码',
        role: '用户角色',
        follow: '关注设置',
        regist_start_date: '注册时间',
        regist_end_date: '注册时间',
        name: '用户昵称',
        location: '所在地区',
        dateTimeRange: '注册时间',
        trashed: '是否禁用',
        recommend: '是否推荐',
        currency: '积 分',
        createdAt: '注册时间',
        sex: {
          root: '性 别',
          male: '男',
          female: '女',
          hide: '保 密'
        }
      }
    },
    /* 搜索翻译 */
    search: {
      root: '搜索',
      perPage: '每页数据',
      limit: '每页数据',
      page: '当前页数'
    }
    /* 搜索翻译 */
    /** TSPlus */
  }
}

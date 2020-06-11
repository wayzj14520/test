import Mock from 'mockjs'
// import Axios from 'axios'
Mock.mock('/jfgwsh/pass/amReviewlist', {
    // 工作经验不匹配
    work:[
        {name:'相关工作经验不满1年',value:'work_10001'},
        {name:'相关工作经验不满2年',value:'work_10002'},
        {name:'相关工作经验不满3年',value:'work_10003'},
        {name:'相关工作经验不满4年',value:'work_10004'},
        {name:'相关工作经验不满5年',value:'work_10005'},
        {name:'相关工作经验不满6年',value:'work_10006'},
        {name:'相关工作经验不满7年',value:'work_10007'},
        {name:'相关工作经验不满8年',value:'work_10008'},
        {name:'相关工作经验不满9年',value:'work_10009'},
        {name:'相关工作经验不满10年',value:'work_10010'},
        {name:'其他',value:'work_other'},
    ],
    // 技能不匹配
    skill:[{
        name: '技术',
        value: 'technical',
        // 技术岗位
        data: [
            {name: 'Spring，MyBatis，SpringMVC，Hibernate等开源框架技术不扎实', value: 'skill_technical_10001'},
            {name: 'Springboot，Springcloud 微服务技术不扎实', value: 'skill_technical_10002'},
            {name: 'I/O、多线程、集合等技术不扎实', value: 'skill_technical_10003'},
            {name: '无Linux开发经验', value: 'skill_technical_10004'},
            {name: '分布式缓存技术不扎实', value: 'skill_technical_10005'},
            {name: 'Oracle技术不扎实', value: 'skill_technical_10006'},
            {name: 'Mysql技术不扎实', value: 'skill_technical_10007'},
            {name: 'SQLServer技术不扎实', value: 'skill_technical_10008'},
            {name: 'DB2技术不扎实', value: 'skill_technical_10009'},
            {name: '安卓开发能力较弱', value: 'skill_technical_10010'},
            {name: 'IOS开发能力较弱', value: 'skill_technical_10011'},
            {name: 'php基础不扎实', value: 'skill_technical_10012'},
            {name: 'Vue.js框架，vue-router、vuex、axios、vue-cli等生态链技术不扎实', value: 'skill_technical_10013'},
            {name: 'TCP/IP、HTTP、SSL、RESTfulWebservice等WEB应用常用网络协议技术不扎实', value: 'skill_technical_10014'},
            {name: 'Html5、CSS、javascript、Jquery、Ajax，JSON等前端技术不扎实', value: 'skill_technical_10015'},
            {name: 'React框架技术不扎实', value: 'skill_technical_10016'},
            {name: 'anglar框架技术不扎实', value: 'skill_technical_10017'},
            {name: 'ASP.NET 基础不扎实', value: 'skill_technical_10018'},
            {name: 'B/S经验不足', value: 'skill_technical_10019'},
            {name: 'C/S经验不足', value: 'skill_technical_10020'},
            {name: 'wpf能力不足', value: 'skill_technical_10021'},
            {name: 'winform能力不足', value: 'skill_technical_10022'},
            {name: 'C/C++基础不扎实', value: 'skill_technical_10023'},
            {name: 'TCP、UDP、HTTP协议不熟悉', value: 'skill_technical_10024'},
            {name: '脚本语言不熟悉', value: 'skill_technical_10025'},
            {name: 'python基础不扎实', value: 'skill_technical_10026'},
            {name: '爬虫算法不熟练', value: 'skill_technical_10027'},
            {name: '对tensorflow和pytorch撰写算法不熟悉', value: 'skill_technical_10028'},
            {name: 'SAP业务流程基础不扎实', value: 'skill_technical_10029'},
            {name: 'BIM数据建模不熟悉', value: 'skill_technical_10030'},
            {name: '数据清洗、转化、处理、迁移，分析等不熟悉', value: 'skill_technical_10031'},
            {name: '原型设计不扎实', value: 'skill_technical_10032'},
            {name: '单片机知识不扎实', value: 'skill_technical_10033'},
            {name: '安全开发和安全框架不熟悉', value: 'skill_technical_10034'},
            {name: '大数据平台的架构不熟悉', value: 'skill_technical_10035'},
            {name: '售前技术能力不足', value: 'skill_technical_10036'},
            {name: '架构设计能力不足', value: 'skill_technical_10037'},
            {name: '其他', value: 'skill_technical_other'},
        ],
    },{
        name: '设计',
        value: 'design',
        // 设计岗位
        data:[
            {name:'pc端视觉设计能力较弱',value:'skill_design_10001'},
            {name:'移动端视觉设计能力较弱',value:'skill_design_10002'},
            {name:'三维设计软件不熟悉',value:'skill_design_10003'},
            {name:'多媒体设计及后期编辑不熟悉',value:'skill_design_10004'},
            {name:'平面设计和网页设计创意能力较弱',value:'skill_design_10005'},
            {name:'作品缺乏创意',value:'skill_design_10006'},
            {name:'其他',value:'skill_design_other'},
        ],
    },{
        name: '产品与运营',
        value: 'product',
        // 产品与运营岗位
        data:[
            {name:'撰写需求文档能力弱',value:'skill_product_10001'},
            {name:'调研分析能力弱',value:'skill_product_10002'},
            {name:'组织协调能力较弱',value:'skill_product_10003'},
            {name:'功能设计较弱',value:'skill_product_10004'},
            {name:'活动运营方案，推动活动方案落地能力较弱',value:'skill_product_10005'},
            {name:'策划并执行线上及线下活动能力较弱',value:'skill_product_10006'},
            {name:'运营数据、用户行为数据等进行分析和挖掘能力较弱',value:'skill_product_10007'},
            {name:'微信公众号专栏写作、内容采编及用户互动能力较弱',value:'skill_product_10008'},
            {name:'文案撰写能力和编辑能力较弱',value:'skill_product_10009'},
            {name:'营销方案策划及追踪能力较弱',value:'skill_product_10010'},
            {name:'其他',value:'skill_product_other'},
        ],
    },{
        name: '项目管理',
        value: 'manage',
        //项目管理岗位
        data:[
            {name:'技术架构和业务架构设计能力较弱',value:'skill_manage_10001'},
            {name:'研发过程管理和控制能力较弱',value:'skill_manage_10002'},
            {name:'产品设计过程，包括市场分析、需求分析、产品功能设计、业务流程设计、界面设计等；能力较弱',value:'skill_manage_10003'},
            {name:'质量管理手法和质量统计工具能力较弱',value:'skill_manage_10004'},
            {name:'制定项目实施计划，组织客户培训和项目技术验收工作能力较弱',value:'skill_manage_10005'},
            {name:'其他',value:'skill_manage_other'},
        ],
    },{
        name: '运维',
        value: 'maintenance',
        // 运维岗位
        data:[
            {name:'现场程序更新、部署、调试与问题处理能力较弱',value:'skill_maintenance_10001'},
            {name:'系统缺陷的跟踪、定位、审核能力较弱',value:'skill_maintenance_10002'},
            {name:'设备配置，日常监控，故障处理能力较弱',value:'skill_maintenance_10003'},
            {name:'服务器的安装、配置、权限调试与维护能力较弱',value:'skill_maintenance_10004'},
            {name:'配电系统的运行管理和施工能力较弱',value:'skill_maintenance_10005'},
            {name:'底层软件和硬件的调试能力较弱',value:'skill_maintenance_10006'},
            {name:'其他',value:'skill_maintenance_other'},
        ],
    },{
        name: '测试序列',
        value: 'test',
        //测试岗位
        data:[
            {name:'估算法质量及效果能力较弱',value:'skill_test_10001'},
            {name:'服务器系统架构不熟悉',value:'skill_test_10002'},
            {name:'测试基础薄弱',value:'skill_test_10003'},
            {name:'自动化测试能力不足',value:'skill_test_10004'},
            {name:'性能测试能力不足',value:'skill_test_10005'},
            {name:'web端测试经验较少',value:'skill_test_10006'},
            {name:'硬件测试工具不熟悉',value:'skill_test_10007'},
            {name:'APP测试经验较少',value:'skill_test_10008'},
            {name:'用例编写能力不足',value:'skill_test_10009'},
            {name:'其他',value:'skill_test_other'},
        ],
    }, {
        name: '其他',
        value: 'other',
        // 其他
        data: [
            {name: '整体能力较一般', value: 'skill_other_10001'}
        ],
    }],
    // 行业经验不匹配
    industry:[
        {name:'过往行业不匹配',value:'industry_100001'},
        {name:'非计算机相关专业',value:'industry_100002'},
        {name:'非设计类相关专业',value:'industry_100003'},
        {name:'非数学相关专业',value:'industry_100004'},
        {name:'非传媒相关专业',value:'industry_100005'},
        {name:'行业新趋势及方向不清晰',value:'industry_100006'},
        {name:'无互联网思维',value:'industry_100007'},
        {name:'其他',value:'industry_other'},
    ],
    // 简历不完善
    resume:[
        {name:'项目经验空缺',value:'resume_100001'},
        {name:'项目经验太少',value:'resume_100002'},
        {name:'未写明教育经历',value:'resume_100003'},
        {name:'无作品附带',value:'resume_100004'},
        {name:'其他',value:'resume_other'},
    ],
    // 其他原因
    other:[
        {name:'学历不符合要求',value:'other_100001'},
        {name:'出差频率无法接受',value:'other_100002'},
        {name:'沟通能力较弱',value:'other_100003'},
        {name:'笔试分数不达标',value:'other_100004'},
        {name:'机试分数不达标',value:'other_100005'},
        {name:'跳槽过于频繁',value:'other_100006'},
        {name:'其他',value:'other_other'},
    ],
})

Mock.mock('/jfgwsh/pass/amFeedbacklist', {
    // 工作经验不匹配
    work:[
        {name:'相关工作经验不满1年',value:'work_10001'},
        {name:'相关工作经验不满2年',value:'work_10002'},
        {name:'相关工作经验不满3年',value:'work_10003'},
        {name:'相关工作经验不满4年',value:'work_10004'},
        {name:'相关工作经验不满5年',value:'work_10005'},
        {name:'相关工作经验不满6年',value:'work_10006'},
        {name:'相关工作经验不满7年',value:'work_10007'},
        {name:'相关工作经验不满8年',value:'work_10008'},
        {name:'相关工作经验不满9年',value:'work_10009'},
        {name:'相关工作经验不满10年',value:'work_10010'},
        {name:'其他',value:'work_other'},
    ],
    // 技能不匹配
    skill:[{
        name: '技术',
        value: 'technical',
        // 技术岗位
        data: [
            {name: 'Spring，MyBatis，SpringMVC，Hibernate等开源框架技术不扎实', value: 'skill_technical_10001'},
            {name: 'Springboot，Springcloud 微服务技术不扎实', value: 'skill_technical_10002'},
            {name: 'I/O、多线程、集合等技术不扎实', value: 'skill_technical_10003'},
            {name: '无Linux开发经验', value: 'skill_technical_10004'},
            {name: '分布式缓存技术不扎实', value: 'skill_technical_10005'},
            {name: 'Oracle技术不扎实', value: 'skill_technical_10006'},
            {name: 'Mysql技术不扎实', value: 'skill_technical_10007'},
            {name: 'SQLServer技术不扎实', value: 'skill_technical_10008'},
            {name: 'DB2技术不扎实', value: 'skill_technical_10009'},
            {name: '安卓开发能力较弱', value: 'skill_technical_10010'},
            {name: 'IOS开发能力较弱', value: 'skill_technical_10011'},
            {name: 'php基础不扎实', value: 'skill_technical_10012'},
            {name: 'Vue.js框架，vue-router、vuex、axios、vue-cli等生态链技术不扎实', value: 'skill_technical_10013'},
            {name: 'TCP/IP、HTTP、SSL、RESTfulWebservice等WEB应用常用网络协议技术不扎实', value: 'skill_technical_10014'},
            {name: 'Html5、CSS、javascript、Jquery、Ajax，JSON等前端技术不扎实', value: 'skill_technical_10015'},
            {name: 'React框架技术不扎实', value: 'skill_technical_10016'},
            {name: 'anglar框架技术不扎实', value: 'skill_technical_10017'},
            {name: 'ASP.NET 基础不扎实', value: 'skill_technical_10018'},
            {name: 'B/S经验不足', value: 'skill_technical_10019'},
            {name: 'C/S经验不足', value: 'skill_technical_10020'},
            {name: 'wpf能力不足', value: 'skill_technical_10021'},
            {name: 'winform能力不足', value: 'skill_technical_10022'},
            {name: 'C/C++基础不扎实', value: 'skill_technical_10023'},
            {name: 'TCP、UDP、HTTP协议不熟悉', value: 'skill_technical_10024'},
            {name: '脚本语言不熟悉', value: 'skill_technical_10025'},
            {name: 'python基础不扎实', value: 'skill_technical_10026'},
            {name: '爬虫算法不熟练', value: 'skill_technical_10027'},
            {name: '对tensorflow和pytorch撰写算法不熟悉', value: 'skill_technical_10028'},
            {name: 'SAP业务流程基础不扎实', value: 'skill_technical_10029'},
            {name: 'BIM数据建模不熟悉', value: 'skill_technical_10030'},
            {name: '数据清洗、转化、处理、迁移，分析等不熟悉', value: 'skill_technical_10031'},
            {name: '原型设计不扎实', value: 'skill_technical_10032'},
            {name: '单片机知识不扎实', value: 'skill_technical_10033'},
            {name: '安全开发和安全框架不熟悉', value: 'skill_technical_10034'},
            {name: '大数据平台的架构不熟悉', value: 'skill_technical_10035'},
            {name: '售前技术能力不足', value: 'skill_technical_10036'},
            {name: '架构设计能力不足', value: 'skill_technical_10037'},
            {name: '其他', value: 'skill_technical_other'},
        ],
    },{
        name: '设计',
        value: 'design',
        // 设计岗位
        data:[
            {name:'pc端视觉设计能力较弱',value:'skill_design_10001'},
            {name:'移动端视觉设计能力较弱',value:'skill_design_10002'},
            {name:'三维设计软件不熟悉',value:'skill_design_10003'},
            {name:'多媒体设计及后期编辑不熟悉',value:'skill_design_10004'},
            {name:'平面设计和网页设计创意能力较弱',value:'skill_design_10005'},
            {name:'作品缺乏创意',value:'skill_design_10006'},
            {name:'其他',value:'skill_design_other'},
        ],
    },{
        name: '产品与运营',
        value: 'product',
        // 产品与运营岗位
        data:[
            {name:'撰写需求文档能力弱',value:'skill_product_10001'},
            {name:'调研分析能力弱',value:'skill_product_10002'},
            {name:'组织协调能力较弱',value:'skill_product_10003'},
            {name:'功能设计较弱',value:'skill_product_10004'},
            {name:'活动运营方案，推动活动方案落地能力较弱',value:'skill_product_10005'},
            {name:'策划并执行线上及线下活动能力较弱',value:'skill_product_10006'},
            {name:'运营数据、用户行为数据等进行分析和挖掘能力较弱',value:'skill_product_10007'},
            {name:'微信公众号专栏写作、内容采编及用户互动能力较弱',value:'skill_product_10008'},
            {name:'文案撰写能力和编辑能力较弱',value:'skill_product_10009'},
            {name:'营销方案策划及追踪能力较弱',value:'skill_product_10010'},
            {name:'其他',value:'skill_product_other'},
        ],
    },{
        name: '项目管理',
        value: 'manage',
        //项目管理岗位
        data:[
            {name:'技术架构和业务架构设计能力较弱',value:'skill_manage_10001'},
            {name:'研发过程管理和控制能力较弱',value:'skill_manage_10002'},
            {name:'产品设计过程，包括市场分析、需求分析、产品功能设计、业务流程设计、界面设计等；能力较弱',value:'skill_manage_10003'},
            {name:'质量管理手法和质量统计工具能力较弱',value:'skill_manage_10004'},
            {name:'制定项目实施计划，组织客户培训和项目技术验收工作能力较弱',value:'skill_manage_10005'},
            {name:'其他',value:'skill_manage_other'},
        ],
    },{
        name: '运维',
        value: 'maintenance',
        // 运维岗位
        data:[
            {name:'现场程序更新、部署、调试与问题处理能力较弱',value:'skill_maintenance_10001'},
            {name:'系统缺陷的跟踪、定位、审核能力较弱',value:'skill_maintenance_10002'},
            {name:'设备配置，日常监控，故障处理能力较弱',value:'skill_maintenance_10003'},
            {name:'服务器的安装、配置、权限调试与维护能力较弱',value:'skill_maintenance_10004'},
            {name:'配电系统的运行管理和施工能力较弱',value:'skill_maintenance_10005'},
            {name:'底层软件和硬件的调试能力较弱',value:'skill_maintenance_10006'},
            {name:'其他',value:'skill_maintenance_other'},
        ],
    },{
        name: '测试序列',
        value: 'test',
        //测试岗位
        data:[
            {name:'估算法质量及效果能力较弱',value:'skill_test_10001'},
            {name:'服务器系统架构不熟悉',value:'skill_test_10002'},
            {name:'测试基础薄弱',value:'skill_test_10003'},
            {name:'自动化测试能力不足',value:'skill_test_10004'},
            {name:'性能测试能力不足',value:'skill_test_10005'},
            {name:'web端测试经验较少',value:'skill_test_10006'},
            {name:'硬件测试工具不熟悉',value:'skill_test_10007'},
            {name:'APP测试经验较少',value:'skill_test_10008'},
            {name:'用例编写能力不足',value:'skill_test_10009'},
            {name:'其他',value:'skill_test_other'},
        ],
    }, {
        name: '其他',
        value: 'other',
        // 其他
        data: [
            {name: '整体能力较一般', value: 'skill_other_10001'}
        ],
    }],
    // 行业经验不匹配
    industry:[
        {name:'过往行业不匹配',value:'industry_100001'},
        {name:'非计算机相关专业',value:'industry_100002'},
        {name:'非设计类相关专业',value:'industry_100003'},
        {name:'非数学相关专业',value:'industry_100004'},
        {name:'非传媒相关专业',value:'industry_100005'},
        {name:'行业新趋势及方向不清晰',value:'industry_100006'},
        {name:'无互联网思维',value:'industry_100007'},
        {name:'其他',value:'industry_other'},
    ],
    // 简历不完善
    resume:[
        {name:'项目经验空缺',value:'resume_100001'},
        {name:'项目经验太少',value:'resume_100002'},
        {name:'未写明教育经历',value:'resume_100003'},
        {name:'无作品附带',value:'resume_100004'},
        {name:'其他',value:'resume_other'},
    ],
    interview:[
        {name:'面试未到场',value:'nocome'},
        {name:'其他',value:'interview_other'},
    ],
    // 其他原因
    other:[
        {name:'学历不符合要求',value:'other_100001'},
        {name:'出差频率无法接受',value:'other_100002'},
        {name:'沟通能力较弱',value:'other_100003'},
        {name:'笔试分数不达标',value:'other_100004'},
        {name:'机试分数不达标',value:'other_100005'},
        {name:'跳槽过于频繁',value:'other_100006'},

        {name:'加班强度无法接受',value:'other_100007'},
        {name:'工作地点偏远',value:'other_100008'},
        {name:'性格过于外向',value:'other_100009'},
        {name:'性格过于内向',value:'other_100010'},
        {name:'学习能力差',value:'other_100011'},
        {name:'身体原因',value:'other_100012'},
        {name:'其他',value:'other_other'},
    ],
})
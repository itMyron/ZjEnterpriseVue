let root = process.env.API_ROOT;
let API = {
  // 接口备注
  POST_PERSONAL_LIST: root + "/cp/supp/suppList", //获取个人供应商列表
  POST_SYS_LOGIN: root + "/sys/login", //渠道登入
  POST_SYS_LOGINOUT: root + "/logout", //退出
  POST_PERSONAL_ADD: root + "/cp/supp/save", //添加个人供应商
  POST_CORE_LIMITCM: root + "/cp/core/limitDetail", //核心企业额度
  POST_PERSONAL_DETAIL: root + "/cp/supp/detail", //供应商详情信息
  POST_FINAN_LIST: root + "/cp/supp/suppReceivablesList", // 保理融资列表
  POST_FINAN_DETAIL: root + "/sp/suppler/queryInfo", //保理融资详情信息
  POST_SYS_RESET: root + "/sys/user/resetPaw", //重置密码
  POST_SYS_CRTA: root + "/cp/core/createAccount", //创建账号
  POST_PERSONAL_AUDIT: root + "/cp/supp/audit", //审核
  POST_FINAN_AUDIT: root + "/cp/supp/auditReceivables", //保理审核
  POST_SYS_UPLOADIMG: root + "/sys/fileResource/uploadImg", //上传图片
  POST_SYS_MENU: root + "/sys/menu", //左侧菜单
  POST_BASE_COMPANY_INFO: root + "/sp/suppler/base_company_info", //企业(个人)供应商基本信息
  POST_UPDATE_COMPANY_INFO: root + "/sp/suppler/update_company_info", //企业(个人)供应商信息修改
  POST_SUPPLIERFACTORINGLIST: root + "/sp/suppler/supplierFactoringList", //供应商保理列表
  POST_ADD_FACT: root + "/sp/suppler/add_fact", //应收账款录入
  POST_QUERYINFO: root + "/sp/suppler/queryInfo", //应收账款查看
  POST_START_BU: root + "/sp/suppler/start_bu", //发起保理业务
  CORE_COMPARE_BASEINFO: root + "/cp/core/detail", //企业基本信息详情
  CREDIT_MONEY: root + "/cp/core/limitDetail", //查询授信额度信息接口
  SUBMIT_COMPARE_INFO: root + "/cp/core/modifyBase", //修改企业基本信息
  ADD_SUPPLIER_INFO: root + "/cp/supp/save", //企业供应商的添加
  COMPARE_SUPPLIER_LIST: root + "/cp/supp/suppList?type=2", //企业供应商列表
  COMPARE_SUPPLIER_DETAIL: root + "/cp/supp/detail", //企业供应商的查看接口  params suppId
  COMPARE_SUPPLIER_AUDIT: root + "/cp/supp/audit", //企业供应商状态的更新
  SYSTEM_UPDATE_PWD : root + "/sys/user/password",
  GET_PWD_STR:root+"/sys/login/get",


};

export default API;

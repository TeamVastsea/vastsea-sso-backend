# Vastsea SSO Backend

## 功能

- 角色管理
- 用户管理
- 权限管理
- 登录
- 登出

## 部署

### 环境变量

```env
CLIENT_ID=                # SSO客户端ID
CLIENT_SECRET=            # SSO客户端secret
REDIRECT=                 # 携带授权码跳转的URL
COMMON_ERROR_REDIRECT=    # 兜底错误跳转
REDIS_CLUSTER=            # 是否启用redis集群模式 true 未开启 false 为关闭
APP_NAME=                 # 人类可读的SSO名称
ADMIN_PWD="admin"         # 超级管理员密码, 空则为随机字符串, 初始化时使用
``` 


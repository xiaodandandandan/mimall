//如果使用CORS或者Jsonp跨域 则需根据不同的环境配置环境变量
let baseURL;

switch (process.env.NODE_ENV) {
    case 'development':
      baseURL = 'http://dev-mall-pre.springboot.cn/api';
      break;
    case 'test':
      baseURL = 'http://test-mall-pre.springboot.cn/api';
      break;
    case 'prev':
      baseURL = 'http://prev-mall-pre.springboot.cn/api';
      break;
    case 'prod':
      baseURL = 'http://mall-pre.springboot.cn/api';
      break;
    default:
      baseURL = 'http://mall-pre.springboot.cn/api';
      break;
}

export default{
    baseURL
}
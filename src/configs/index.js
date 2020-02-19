/**
 * 项目配置文件
 * author: LN
 */

const env = process.env.NODE_ENV;

console.log('env', env);

const development = {
  serverURL: 'http://localhost:8081/api/company-service',
};

const qa = {
  serverURL: '',
};

const production = {
  serverURL: '',
};

const config = {
  development,
  qa,
  production,
};

export default config[env];


module.exports = {
  // route: data | get data function
  '/api/test/getName': (params) => {
    return {
      name: 'Daniel',
      params: params
    };
  },
  '/api/test/getMsg': { msg: 'Hello' },
  '/api/test/getProvinces': (params) => {
    return [{ id: 1, name: 'Guangdong' }, { id: 2, name: 'Beijing' }].filter(item => !params.keyword || item.name.indexOf(params.keyword) >= 0);
  },
  '/api/test/getCities': (params) => {
    let result = {
      1: [{ id: 10, name: 'Canton' }, { id: 20, name: 'Shantou' }],
      2: [{ id: 30, name: 'Beijing' }]
    }
    let res = result[params.provinceId] || [];
    return res.filter(item => !params.keyword || item.name.indexOf(params.keyword) >= 0);
  }
};

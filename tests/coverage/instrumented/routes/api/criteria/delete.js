
var __cov_WSmlZZqwTrgDRnzRCd2XbQ = (Function('return this'))();
if (!__cov_WSmlZZqwTrgDRnzRCd2XbQ.__coverage__) { __cov_WSmlZZqwTrgDRnzRCd2XbQ.__coverage__ = {}; }
__cov_WSmlZZqwTrgDRnzRCd2XbQ = __cov_WSmlZZqwTrgDRnzRCd2XbQ.__coverage__;
if (!(__cov_WSmlZZqwTrgDRnzRCd2XbQ['routes/api/criteria/delete.js'])) {
   __cov_WSmlZZqwTrgDRnzRCd2XbQ['routes/api/criteria/delete.js'] = {"path":"routes/api/criteria/delete.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":4,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":37}}},"2":{"name":"(anonymous_2)","line":8,"loc":{"start":{"line":8,"column":18},"end":{"line":8,"column":43}}},"3":{"name":"(anonymous_3)","line":12,"loc":{"start":{"line":12,"column":19},"end":{"line":12,"column":44}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":38}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":43}},"3":{"start":{"line":4,"column":0},"end":{"line":6,"column":2}},"4":{"start":{"line":5,"column":4},"end":{"line":5,"column":40}},"5":{"start":{"line":8,"column":0},"end":{"line":10,"column":2}},"6":{"start":{"line":9,"column":4},"end":{"line":9,"column":11}},"7":{"start":{"line":12,"column":0},"end":{"line":21,"column":2}},"8":{"start":{"line":13,"column":4},"end":{"line":20,"column":5}},"9":{"start":{"line":14,"column":8},"end":{"line":16,"column":52}},"10":{"start":{"line":17,"column":8},"end":{"line":17,"column":77}},"11":{"start":{"line":19,"column":8},"end":{"line":19,"column":15}}},"branchMap":{"1":{"line":13,"type":"if","locations":[{"start":{"line":13,"column":4},"end":{"line":13,"column":4}},{"start":{"line":13,"column":4},"end":{"line":13,"column":4}}]}}};
}
__cov_WSmlZZqwTrgDRnzRCd2XbQ = __cov_WSmlZZqwTrgDRnzRCd2XbQ['routes/api/criteria/delete.js'];
__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['1']++;var utils=require('../../utils.js');__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['2']++;var criteriaV2=require('../../criteria');__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['3']++;exports.execute=function(req,res){__cov_WSmlZZqwTrgDRnzRCd2XbQ.f['1']++;__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['4']++;criteriaV2.deleteCriteria(req,res);};__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['5']++;exports.convert=function(req,res,next){__cov_WSmlZZqwTrgDRnzRCd2XbQ.f['2']++;__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['6']++;next();};__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['7']++;exports.validate=function(req,res,next){__cov_WSmlZZqwTrgDRnzRCd2XbQ.f['3']++;__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['8']++;if(!req.query.criteria_name){__cov_WSmlZZqwTrgDRnzRCd2XbQ.b['1'][0]++;__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['9']++;utils.log().warn({function:'criteria.delete.validate'},'Criteria name is missing in the query');__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['10']++;return res.status(400).send('Criteria name is missing in the query');}else{__cov_WSmlZZqwTrgDRnzRCd2XbQ.b['1'][1]++;__cov_WSmlZZqwTrgDRnzRCd2XbQ.s['11']++;next();}};

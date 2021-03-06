//assert = require('assert');
var assert = require('chai').assert;
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var REQUEST = require('request');

var dra_server = (process.env.DRA_SERVER || 'https://dra.stage1.ng.bluemix.net');
var dlms_server = (process.env.DLMS_SERVER || 'https://dlms.stage1.ng.bluemix.net');
var auth_url = (process.env.AUTH_URL || 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token');
var o_name = (process.env.CF_ORG || 'vjegase@us.ibm.com');
var uuid = require('node-uuid');

var criteria = readfile('data/criteria/mocha_pass.json');
criteria.org_name = o_name;
var result_good = readfile('data/mochaResult_pass.json');
var result_bad = readfile('data/mochaResult_fail.json');
var uniq = uuid.v4();
criteria.name = "criteria_" + uniq;
result_good.build_id = "dra_fvt_" + uniq;
result_bad.build_id = "dra_fvt_" + uniq; // Assign same build ID to see if event picked by timestamp

var token;
var assert_response;
var assert_proceed;
var assert_score;

var request = REQUEST.defaults({
    strictSSL: false
});

describe('FVT - MOCHA UT BAD vs. GOOD', function() {
    it("get token", function(done) {
        this.timeout(20000);
        var options = { method: 'POST',
          url: auth_url,
          headers: 
           { 'content-type': 'application/x-www-form-urlencoded',
             authorization: 'Basic Y2Y6' },
          form: 
           { username: process.env.CF_USER,
             password: process.env.CF_PASS,
             grant_type: 'password',
             response_type: 'token' } 
            };
        gettoken(options, function() {
            assert.equal(assert_response, 200);
            done();
        });
        // Remove
    });
    it("remove criteria", function(done) {
        this.timeout(20000);
        removecriteria(dra_server, criteria, function() {
            assert.equal(assert_response, 200);
            done();
        });
    });
    it("post criteria", function(done) {
        this.timeout(20000);
        postcriteria(dra_server, criteria, function() {
            assert.equal(assert_response, 201);
            done();
        });
    });
    it("post bad result to DLMS", function(done) {
        this.timeout(20000);
        result_bad.org_name = criteria.org_name;
        postresult(dlms_server, result_bad, function() {
            assert.equal(assert_response, 200);
            done();
        });
    });
    it("post good result to DLMS", function(done) {
        this.timeout(20000);
        setTimeout(function () {
          result_good.org_name = criteria.org_name;
            postresult(dlms_server, result_good, function() {
            assert.equal(assert_response, 200);
            done();
        });
        }, 2000);
        
    });

    it("Get decision from DRA for good", function(done) {
        this.timeout(20000);
        var query = {};
        query.project_name = result_good.project_name;
        query.runtime_name = result_good.runtime_name;
        query.build_id = result_good.build_id;
        query.module_name = result_good.module_name;
        query.criteria_name = criteria.name;
        query.org_name = criteria.org_name;
        getdecision(dra_server, query, function() {
            assert.equal(assert_response, 200);
            assert.equal(assert_proceed, true);
            assert.equal(assert_score, 100);
            done();
        });
    });

    it("remove criteria", function(done) {
        this.timeout(20000);
        removecriteria(dra_server, criteria, function() {
            assert.equal(assert_response, 200);
            done();
        });
    });

});

function readfile(file) {
    var contents = fs.readFileSync(getFilename(file), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
}

function getFilename(filename) {
    var file = path.join(__dirname, filename);
    return file;
}

function gettoken(options, callback) {
    request(options, function (err, resp, body) {
      if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } 
        else {
            var tok = JSON.parse(body);
            //console.log("User: %s |Token type:%s | Expires in:%s",process.env.CF_USER,tok.token_type,tok.expires_in);
            token = tok.access_token;
            assert_response = resp.statusCode;
        }
    callback();
    });
}

function removecriteria(server, criteria, callback) {
    ////console.log("server:",server);//console.log("criteria:",criteria.name);
    request({
        method: 'DELETE',
        url: server + '/api/v3/criteria?org_name=' + criteria.org_name + '&criteria_name=' + criteria.name,
        json: true,
        qs: {
            org_name: criteria.org_name
        },
        headers: {
            Authorization: 'bearer ' + token
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //console.log(body);
            } else {
                //console.log("Delete criteria failed:", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function postcriteria(server, criteria, callback) {
    ////console.log("server:",server);//console.log("criteria:",criteria.name);
    request({
        method: 'POST',
        url: server + '/api/v3/criteria?org_name=' + criteria.org_name,
        json: true,
        body: criteria,
        headers: {
            Authorization: 'bearer ' + token
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 201) {
                assert_response = resp.statusCode;
                //console.log(body);
            } else {
                //console.log("Post criteria failed:", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function postresult(server, result, callback) {
    ////console.log("server:",server);//console.log("result:",result);
    request({
        method: 'POST',
        url: server + '/v1/results',
        json: true,
        body: result,
        headers: {
            Authorization: 'bearer ' + token
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //console.log(body);
            } else {
                //console.log("Post result failed:", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function getdecision(server, query, callback) {
    ////console.log("server:",server);//console.log("result:",result);
    request({
        method: 'POST',
        url: server + '/api/v3/decision?org_name=' + query.org_name,
        json: true,
        body: query,
        headers: {
            Authorization: 'bearer ' + token
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                assert_proceed = body.contents.proceed;
                assert_score = body.contents.score;
                //console.log(JSON.stringify(body));
            } else {
                //console.log("Get decision failed:", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}
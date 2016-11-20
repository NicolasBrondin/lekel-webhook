var superagent = require('superagent')
var expect = require('expect.js')

var admin = null;
var auth_admin = null;

describe('Admin service test', function(){

it('[Admin] authenticate', function(done){
    superagent.post('http://localhost:3000/login')
    .send({email: 'bn@winesee.fr', password: '1l0v3w1n3'})
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        auth_admin = res.body
        done()
    })
})
    
it('[Admin] list_all', function(done){
    superagent.get('http://localhost:3000/admins/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Admin] create', function(done){
    superagent.post('http://localhost:3000/admins/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    account: {
        email: "admin@gmail.com",
        password: "uieryfzç_r"
    },
    role: "normal"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        admin = res.body
        done()
    })
})

it('[Admin] update details', function(done){
    superagent.put('http://localhost:3000/admins/'+admin._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    email: "amin@gmail.com"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Admin] delete', function(done){
    superagent.delete('http://localhost:3000/admins/'+admin._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

});
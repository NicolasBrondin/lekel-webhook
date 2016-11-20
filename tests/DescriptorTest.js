var superagent = require('superagent')
var expect = require('expect.js')

var descriptor = null;
var admin_auth = null;

describe('Descriptor service test', function(){
    
before(function(done){
    superagent.post('http://localhost:3000/login')
    .send({email: 'bn@winesee.fr', password: '1l0v3w1n3'})
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        auth_admin = res.body
        done()
    })
})
    
it('[Descriptor] list_all', function(done){
    superagent.get('http://localhost:3000/descriptors')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Descriptor] create', function(done){
    superagent.post('http://localhost:3000/descriptors')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
        name: "Terpene",
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        descriptor = res.body
        done()
    })
})

it('[Descriptor] update', function(done){
    superagent.put('http://localhost:3000/descriptors/'+descriptor._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
        name: "Terpène"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Descriptor] delete', function(done){
    superagent.delete('http://localhost:3000/descriptors/'+descriptor._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})


});
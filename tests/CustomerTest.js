var superagent = require('superagent')
var expect = require('expect.js')

var customer = null;
var admin_auth = null


describe('Customer service test', function(){
    
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
    
it('[Customer] list_all', function(done){
    superagent.get('http://localhost:3000/customers/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Customer] create', function(done){
    superagent.post('http://localhost:3000/customers/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
        name: "Mammouth",
        siret: "1234567891011"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        customer = res.body
        done()
    })
})

it('[Customer] update details', function(done){
    superagent.put('http://localhost:3000/customers/'+customer._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
        name: "Auchan"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Customer] delete', function(done){
    superagent.delete('http://localhost:3000/customers/'+customer._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

});
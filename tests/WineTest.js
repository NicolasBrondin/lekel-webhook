var superagent = require('superagent')
var expect = require('expect.js')

var wine = null;
var auth_admin = null;

describe('Wine service test', function(){
    
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
    
it('[Wine] list_all', function(done){
    superagent.get('http://localhost:3000/wines/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Wine] create', function(done){
    superagent.post('http://localhost:3000/wines/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    name: "Saint Nicolas",
    country: "France",
    region: "Bourgueil",
    year: 2003,
    type: "Red",
    image: "https://www.google.fr/search?q=wine"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        wine = res.body
        done()
    })
})

it('[Wine] update details', function(done){
    superagent.put('http://localhost:3000/wines/'+wine._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    name: "Saint Nico"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Wine] delete', function(done){
    superagent.delete('http://localhost:3000/wines/'+wine._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Wine] update profile', function(done){
    superagent.put('http://localhost:3000/wines/'+wine._id+'/profiles/0')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
        is_used: false
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})
});
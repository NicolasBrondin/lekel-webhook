var superagent = require('superagent')
var expect = require('expect.js')

describe('Before test', function(){
    
    it('[Before] delete all admins', function(done){
        superagent.delete('http://localhost:3000/admins')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all customers', function(done){
        superagent.delete('http://localhost:3000/customers')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all foods', function(done){
        superagent.delete('http://localhost:3000/food')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all wines', function(done){
        superagent.delete('http://localhost:3000/wines')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all Taster', function(done){
        superagent.delete('http://localhost:3000/tasters')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all Profiles', function(done){
        superagent.delete('http://localhost:3000/profiles')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all Users', function(done){
        superagent.delete('http://localhost:3000/users')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[Before] delete all Descriptors', function(done){
    superagent.delete('http://localhost:3000/descriptors')
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})
    
    it('[Before] initialize admin', function(done){
        superagent.post('http://localhost:3000/admins/init')
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(201)
            done()
        })
    })
});
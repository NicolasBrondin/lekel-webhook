var superagent = require('superagent')
var expect = require('expect.js')

var taster = null;
var profile = null;
var auth_admin = null;
var auth_taster = null;

describe('Taster service test', function(){
    
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
    
it('[Taster] list_all', function(done){
    superagent.get('http://localhost:3000/tasters/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Taster] create', function(done){
    superagent.post('http://localhost:3000/tasters/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    account: {
        email: "taster@gmail.com",
        password: "uieryfzç_'r"
    }
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        taster = res.body
        done()
    })
})

it('[Taster] login', function(done){
        superagent.post('http://localhost:3000/login')
        .send({email: 'taster@gmail.com', password: "uieryfzç_'r"})
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            auth_taster = res.body
            done()
        })
    })

it('[Taster] create_profiles', function(done){
    superagent.post('http://localhost:3000/tasters/'+taster._id+'/profiles')
    .set('Authorization', 'Bearer '+auth_taster.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        done()
    })
})



it('[Taster] get_profiles', function(done){
    superagent.get('http://localhost:3000/tasters/'+taster._id+'/profiles')
    .set('Authorization', 'Bearer '+auth_taster.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        profile = res.body[0]
        done()
    })
})



it('[Taster] update_profile', function(done){
    superagent.put('http://localhost:3000/tasters/'+taster._id+'/profiles/'+profile._id)
    .set('Authorization', 'Bearer '+auth_taster.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Taster] update details', function(done){
    superagent.put('http://localhost:3000/tasters/'+taster._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    account:{ email: "taste@gmail.com"}
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})


/*
it('[Taster] delete', function(done){
    superagent.delete('http://localhost:3000/tasters/'+taster._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})*/
});
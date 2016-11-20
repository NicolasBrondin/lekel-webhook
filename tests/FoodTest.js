var superagent = require('superagent')
var expect = require('expect.js')

var food = null;
var admin_auth = null;

describe('Food service test', function(){
    
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
    
it('[Food] list_all', function(done){
    superagent.get('http://localhost:3000/food/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Food] create', function(done){
    superagent.post('http://localhost:3000/food/')
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    name: "Tomato",
    display_name: [
        {value: "Tomato", lang: "en"},
        {value: "Tomate", lang: "fr"}
    ],
    image: "https://www.google.fr/search?q=tomato"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(201)
        food = res.body
        done()
    })
})

it('[Food] update details', function(done){
    superagent.put('http://localhost:3000/food/'+food._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .send({
    name: "tomate"
    })
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

it('[Food] delete', function(done){
    superagent.delete('http://localhost:3000/food/'+food._id)
    .set('Authorization', 'Bearer '+auth_admin.token)
    .end(function(e,res){
        expect(e).to.eql(null)
        expect(res.statusCode).to.eql(200)
        done()
    })
})

});
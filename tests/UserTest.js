var superagent = require('superagent')
var expect = require('expect.js')

var user = null;
var auth_admin = null;
var food = null;

describe('User service test', function(){
    /*
    before(function(done){
        superagent.post('http://localhost:3000/')
        .send({ })
        .end(function(e,res){
            expect(e).to.not.equal(null)
            done()
        })
    });
    */
    
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
    
    before(function(done){
        superagent.post('http://localhost:3000/descriptors/')
        .set('Authorization', 'Bearer '+auth_admin.token)
        .send({
            name: "Sugar",
        })
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(201)
            descriptor = res.body
            done()
        })
    })
    
    before(function(done){
        superagent.post('http://localhost:3000/food/')
        .set('Authorization', 'Bearer '+auth_admin.token)
        .send({
        name: "Tomato",
        taste_profile: {
            is_used: true,
            descriptors: [
                {
                    descriptor_reference: descriptor._id,
                    intensity: 5
                }
            ]
        },
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
    
    it('[User] list_all', function(done){
        superagent.get('http://localhost:3000/users')
        .set('Authorization', 'Bearer '+auth_admin.token)
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            expect(res.body.length).to.eql(0)
            done()
        })
    })
    
    it('[User] create', function(done){
        superagent.post('http://localhost:3000/users')
        .send({
            
        })
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(201)
            user = res.body
            done()
        })
    })
    
    it('[User] get_details', function(done){
        superagent.get('http://localhost:3000/users/'+user._id)
        .set('Authorization', 'Bearer '+auth_admin.token)
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[User] update_details', function(done){
        superagent.put('http://localhost:3000/users/'+user._id)
        .set('Authorization', 'Bearer '+auth_admin.token)
        .send({
            account: {
                email: "user@gmail.com",
                password: "mypassword"
            }
        })
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[User] add taste', function(done){
        superagent.post('http://localhost:3000/users/'+user._id+'/tastes')
        .set('Authorization', 'Bearer '+user.token)
        .send({
            food_reference: food._id,
            likes: true
        })
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    it('[User] update_profile', function(done){
        superagent.put('http://localhost:3000/users/'+user._id+'/profile')     
        .set('Authorization', 'Bearer '+auth_admin.token)
        .send({
            profile: [
                {
                    descriptor_reference: descriptor._id,
                    intensity: 4
                }
            ]
        })
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
    
    
    
    
    
    it('[User] get_matching', function(done){
        superagent.get('http://localhost:3000/users/'+user._id+'/matching')
        .set('Authorization', 'Bearer '+auth_admin.token)
        .end(function(e,res){
            expect(e).to.eql(null)
            expect(res.statusCode).to.eql(200)
            done()
        })
    })
  /*
    after(function(done){
        superagent.delete('http://localhost:3000/')
        .send({
        })
        .end(function(e,res){
            done()
        })
    });
    */
})
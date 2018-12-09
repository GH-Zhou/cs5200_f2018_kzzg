const mongoose = require('mongoose');
const userSchema = require("./back-end/models/user/user.schema.server");
const userModel = mongoose.model('UserModel', userSchema);
const promise = require('promise');

function createDummyUsers() {

    const user1 = {
        username: '1',
        password: '1',
        role:'ADMIN',
    };

    const user2= {
        username: '2',
        password: '2',
        role:'STAFF',
        duty:'TICKET_CHECKER',

    };

    const user3= {
        username: '3',
        password: '3',
        role:'STAFF',
        duty:'CREW',

    };

    const user4= {
        username: '4',
        password: '4',
        role:'STAFF',
        duty:'REPRESENTATIVE',


    };

    const user5 = {
        username: '5',
        password: '5',
        role:'MEMBER',

    };

    const user6 ={
        username: '6',
        password: '6',
        role:'PASSENGER',
        check_in: false,

    };

    const user7 ={
        username: '7',
        password: '7',
        role:'PASSENGER',
        check_in: false,

    };

    const user8 ={
        username: '8',
        password: '8',
        role:'PASSENGER',
        check_in: false,

    };


    userModel.remove({}).then(
        res =>{
            return promise.all([
                userModel.create(user1),
                userModel.create(user2),
                userModel.create(user3),
                userModel.create(user4),
                userModel.create(user5),
                userModel.create(user6),
                userModel.create(user7),
                userModel.create(user8),
            ])
        }
    ).then(
        res =>{
            console.log("created all dummy users");
            return userModel.find({role:'PASSENGER'});
        },
        err => {
            console.log(err);
        }
    ).then(
        res =>{
            return promise.all(res.map(
                pass => {
                    return addPassenger(pass._id, "2")
                }
            ))
        }

    ).then(
        res =>{
            console.log("insert passengers");
        }
    );

    function findUserByUsername(username){
        return userModel.findUserByUsername({username:username})
    }

    function addPassenger(passengerId,ticketCheckerUsername) {

        return userModel.findOneAndUpdate({username: ticketCheckerUsername}, {$push: { passengers: passengerId } })

    }



}

module.exports ={
    createDummyUsers,
};


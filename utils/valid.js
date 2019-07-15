var valid = {
    checkParams: function(refObj, evalueObj) {

        var a = Object.keys(evalueObj).sort().toString();
        var b = Object.keys(refObj["obj"]).sort().toString();
        // console.log(a);
        // console.log(b);
        if (a == b) {
            return true;
        }

        return false;
    },
    checkEmail: function(email) {
        var exp = /^[^@]+@[^@]+\.[a-zA-Z]{2,3}$/g;
        if (email.match(exp) == null) {
            return false;
        }
        return true;
    },
    // checkPassword: function(pass) {
    //     let exp = /^[a-z0-9_-]{6,18}$/g;
    //     if (pass.match(exp) == null) {
    //         return false;
    //     }
    //     return true;
    // },
    checkNumber: function(number) {
        var exp = /^\d+$/g;
        if (number.match(exp) == null) {
            return false;
        }
        return true;
    }
};


module.exports = valid;
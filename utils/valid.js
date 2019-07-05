var valid = {
    checkParams: function(refObj, evalueObj) {

        var a = Object.keys(evalueObj).sort().toString();
        var b = Object.keys(refObj["obj"]).sort().toString();
        console.log(b);
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
    }
};


module.exports = valid;
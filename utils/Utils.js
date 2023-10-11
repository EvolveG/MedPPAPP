function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

function validateMemNumber(value, setmembNumbError) {
    if (value.length < 7) {
        setmembNumbError("Must be 7 characters")
    } else {
        setmembNumbError("")
    }
}

function validateMemID(value, setmembIDError) {
    if (value.length < 13) {
        setmembIDError("ID Must be 13 characters")
    } else {
        setmembIDError("")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validateMemID,
    validateMemNumber
};

export default utils;
function getPOSTUserTestData() {
    return {
        withCredentials: {
            "name": "morpheus",
            "job": "leader"

        },
        withoutNameAndJob: {
            "name": " ",
            "job": " "
        },
        withNameOnly: {
            "name": "Pablo Emilio Escobar Gaviria"
        },
        withJobOnly: {
            "job": "Narco Dealer"
        }
    };
}

function getEditUserTestData() {
    return {
        withNameAndJob: {
            "name": "morpheus",
            "job": "zion resident"
        },
        withIdOnly: {
            "id": "98"
        }
    };
}

export {
    getPOSTUserTestData, getEditUserTestData
};
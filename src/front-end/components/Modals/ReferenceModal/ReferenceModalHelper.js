function getStateAfterValidation({ name, year, startPage, endPage, authors, ...rest }) {
    const newState = { 
        name:      "", authors: "",
        publisher: "", city: "", year: "",
        edition:   "",
        startPage: "", endPage: "",
        text: "",      link:""
    };

    function validName() {
        return new Promise( resolve => {
            if (!name.trim()) {
                newState.name = "Reference name can't be empty or consist only of whitespace";

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validAuthors() {
        return new Promise( resolve => {
            if (authors) {
                if (authors.length > 50) {
                    newState.authors = "Authors list can't be longer than 50";
    
                    return resolve(false);
                } else if (authors.some( el => el.length > 100 )) {
                    newState.authors = "Author's name can't be longer than 100 characters";
    
                    return resolve(false);
                }
            } 

            return resolve(true);
        });
    }

    function validYear() {
        return new Promise( resolve => {
            if (startPage !== undefined && (year > new Date().getFullYear())) {
                newState.year = "Publishing year can't be later than current year";

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validStartPage() {
        return new Promise( resolve => {
            if (startPage !== undefined && (startPage < 0 || 10000 < startPage)) {
                newState.startPage = "Start page number must be between 0 and 10000";

                return resolve(false);
            } else if (startPage > parseInt(endPage)) {
                newState.startPage = "Start page number can't be higher than end page";
                newState.endPage   = "End page number can't be lower than start page";

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validEndPage() {
        return new Promise( resolve => {
            if (endPage !== undefined && (endPage < 0 || 10000 < endPage)) {
                newState.endPage = "End page number must be between 0 and 10000";

                return resolve(false);
            }

            return resolve(true);
        });
    }

    function validTextLength() {
        return new Promise( resolve => {
            const textFields = { ...rest, name };

            let valid = true;

            for (const el in textFields) {
                if (textFields[el].length > 200) {
                    newState[el] = `${el[0].toUpperCase() + el.slice(1)} field can't be longer than 200 characters`;

                    valid = false;
                }
            }

            return resolve(valid);
        });
    }

    return Promise.all([ validName(), validAuthors(), validYear(), 
                         validStartPage(), validEndPage(), validTextLength() ])
        .then( results => ({ newState, valid: results.every(res => res) }) );
}

const parseAuthors = authorsString => authorsString ? authorsString.split(",").map( el => el.trim() ) : [];

function parseNumbers(numbers) {
    const nums = {};

    for (const field in numbers) {
        nums[field] = isNaN( parseInt(numbers[field]) ) ? undefined : numbers[field];
    }

    return nums;
} 

export {
    getStateAfterValidation,
    parseAuthors,
    parseNumbers
};
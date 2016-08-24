'use strict';

import {schema} from './validationSchema';

var Validator = require('jsonschema').Validator;
var v = new Validator();

function validate (employees) {
    try {
        employees = JSON.parse(employees);
    } catch(err) {
        return {'valid': false, 'message': 'Ошибка ' + err.name + ':' + err.message};
    }

    let validData = v.validate(employees, schema);

    if (validData.valid) {
        return {'valid': true, 'message': 'Файл прошел валидацию', 'employees': employees};
    } else {
        let message = 'Обнаружены следующие ошибки:';
        for (var i = 0; i < validData.errors.length; i++) {
            message += '\n'+validData.errors[i].stack;
        }
        return {'valid': false, 'message': message};
    }
}

export {validate};

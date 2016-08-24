
var schema = {
    'title': 'Employees',
    'type': 'array',
    'items': {
        'title': 'Employee',
        'type': 'object',
        'properties': {
            'id': {'type': 'number', 'minimum':0},
            'first_name': {'type': 'string', 'minLength': 1},
            'last_name': {'type': 'string', 'minLength': 1},
            'job': {'type': 'string', 'minLength': 1},
            'rate': {'type': 'integer', 'minimum': 0},
            'typePayment': {'type': 'string', 'enum': ['fixed', 'time']}
        },
        'required': ['id', 'first_name', 'last_name', 'job', 'rate', 'typePayment'],
    }
};
 
export {schema};
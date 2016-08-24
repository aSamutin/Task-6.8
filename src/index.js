'use strict';

import _ from 'lodash';
import {saveData} from './saveData';
import {EmployeeWithFixedPayment} from './EmployeeWithFixedPayment';
import {EmployeeWithTimePayment} from './EmployeeWithTimePayment';
import {validate} from './validation';

var addFile = document.getElementById('myfileinput');
var saveInFile = document.getElementById('save');
var display = document.getElementById('tables');
var employees = [];
var templ = require('ejs!./templates/empTable.ejs');
var templIdTable = require('ejs!./templates/empIdTable.ejs');


addFile.addEventListener('change', function (e) {
    var files = e.target.files;
    if (files[0].name.lastIndexOf('.json') != -1) {
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onloadend = function () {

            let resultValid = validate(reader.result); // проверка данных файла

            if (resultValid.valid) { // если файл валиден
                employees = resultValid.employees;

                for (var i = 0; i < employees.length; i++) { // создаем объекты классов
                    if (employees[i].typePayment === 'fixed') {
                        employees[i] = new EmployeeWithFixedPayment(employees[i]);
                    } else {
                        employees[i] = new EmployeeWithTimePayment(employees[i]);
                    }
                }
                // сортировка по имени и зп
                let sortEmployees =_.sortBy(employees, function(emp) { return [1/(emp.getPayment()), emp.first_name ]; });

                // формирование html
                display.innerHTML = templ( {title: 'Список работников', employees: sortEmployees});
                display.innerHTML+= templ( {title: 'Топ 5 работников', employees: sortEmployees.slice(0, 5)});
                display.innerHTML+= templIdTable( {title: 'Последние id', employees: sortEmployees.slice(-5)});
            } else {
                alert(resultValid.message); // вывод ошибки при валидации
            }
        };

    } else {
        alert('Файл должен быть в формате json');
    }
});

saveInFile.addEventListener('click', function(){
    saveData(employees, 'employees.json');
});

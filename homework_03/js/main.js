// constants for application
const HIRE_FIRE_RECORD = 1;
const CHANGE_SALARY_RECORD = 2;
const MSG_WARNING_RECORD = 3;



// EMPLOYEE
// Employee class has different structure than Company. Just want to know yours opinion about structure of this classes
function Employee(desc) {
    // make the properties with set and get
    Object.defineProperties(this, {
        name: {
            get: function () {
                return this._name;
            },
            set: function (value) {
                if (Employee.REG_EX_FOR_NAME.test(value)) {
                    this._name = value;
                }
                else {
                    console.error("Name must be an appropriate string");
                }
            }
        },
        age: {
            get: function () {
                return this._age;
            },
            set: function (value) {
                if (value >= Employee.MIN_WORKING_AGE) {
                    this._age = value;
                }
            }
        },
        primarySkill: {
            get: function () {
                return this._primarySkill;
            },
            set: function (value) {
                this._primarySkill = value;
            }
        },
        company: {
            get: function () {
                return this._company;
            }
        },
        hireDate: {
            get: function () {
                return this._lastWorkStartTime;
            }
        }
    });

    // private properties
    this._history = [];
    this._company = null;
    this._totalWorkTime = 0;
    this._lastWorkStartTime;

    // checking constructor's arguments for good input
    this._name = (Employee.REG_EX_FOR_NAME.test(desc["name"])) ? desc["name"] : this._logMsgWarning("name of employee is not appropriate");
    this._age = (typeof desc["age"] === "number" && (desc["age"] > Employee.MIN_WORKING_AGE)) ? desc["age"] : this._logMsgWarning("age of employee is not appropriate");
    this._primarySkill = desc["primarySkill"];
    this._salary = (typeof desc["salary"] === "number" && (desc["salary"] > Employee.MIN_SALARY)) ? desc["salary"] : Employee.MIN_SALARY;
}

// accessors for _salary
Employee.prototype.getSalary = function () {
    return this._salary;
};
Employee.prototype.setSalary = function (newSalary) {
    // writing oldSalary for logging
    let oldSalary = this.getSalary();
    let isCanChange = newSalary > oldSalary;
    if (isCanChange) {
        this._salary = newSalary;
    }
    this._logChangeSalary(isCanChange, oldSalary, newSalary);
};

// "accessors" for _company
Employee.prototype.hire = function (newCompany) {
    if (this._isCompany(newCompany) && (this._company === null)) {
        this._company = newCompany;
        // logging
        this._logHireFire(true, newCompany.name);
    }
    else {
        console.error("Bad data!!!");
    }
};
Employee.prototype.fire = function (oldCompany) {
    if (this._isCompany(oldCompany) && oldCompany === this._company) {
        this._company = null;
        // logging
        this._logHireFire(false, oldCompany.name);
    }
    else {
        console.error("Bad data!!!");
    }
};

// function returns the total working time of employee
Employee.prototype.getWorkTimeInSeconds = function () {
    // if employee is working now than we need to add this time to returning value
    if (this._company) {
        return (this._totalWorkTime + ((new Date()) - this._lastWorkStartTime)) / 1000;
    }
    return this._totalWorkTime / 1000;
};

// function returns the string view of history of employee
Employee.prototype.getHistory = function () {
    let stringHistory = "";
    for (let i = 0; i < this._history.length; ++i) {
        stringHistory += this._makeStringRecord(this._history[i]);
    }
    return stringHistory;
};

// private function for checking if type of argument is Company
Employee.prototype._isCompany = function (company) {
    return (company && (Object.getPrototypeOf(company).constructor === Company));
};

// private functions for logging
Employee.prototype._logHireFire = function (hireState, companyName) {
    // hire/fire events also calculate work time of employee
    this._calculateWorkTime();
    let logRecord = { type: HIRE_FIRE_RECORD, isHired: hireState, date: new Date(), company: companyName };
    this._history.push(logRecord);
};
Employee.prototype._logChangeSalary = function (isCanChange, oldSalary, newSalary) {
    let logRecord = { type: CHANGE_SALARY_RECORD, isDone: isCanChange, oldValue: oldSalary, newValue: newSalary };
    this._history.push(logRecord);
};
Employee.prototype._logMsgWarning = function (logMsg) {
    let logRecord = { type: MSG_WARNING_RECORD, msg: logMsg };
    this._history.push(logRecord);
};

// this private function called when employee is hiring or firing to write the time of this events
Employee.prototype._calculateWorkTime = function () {
    // if start working than write this time
    if (this._company) {
        this._lastWorkStartTime = new Date();
    }
    // if firing than add working time to _totalWorkingTime
    else {
        this._totalWorkTime += (new Date()) - this._lastWorkStartTime;
    }
};

// private function for making the string view of record for this.getHistory()
Employee.prototype._makeStringRecord = function (record) {
    let strRecord = "";
    // different types of records(can add another if need)
    switch (record.type) {
        case HIRE_FIRE_RECORD:
            strRecord += `${this.name} is`;
            strRecord += (record.isHired) ? " hired to " : " fired from ";
            strRecord += `${record.company} in ${record.date}\n`;
            break;
        case CHANGE_SALARY_RECORD:
            if (record.isDone === false) {
                strRecord += "try to ";
            }
            strRecord += `change salary from ${record.oldValue} to ${record.newValue}\n`;
            break;
        // record with message
        case MSG_WARNING_RECORD:
            strRecord += record.msg + "\n";
            break;
        default:
            throw new Error("undefined type of record");
    }
    return strRecord;
};

// const of Employee
Employee.MIN_WORKING_AGE = 14;
Employee.MIN_SALARY = 100;
Employee.REG_EX_FOR_NAME = /^[a-zA-Z _]+$/;



// COMPANY
let Company = (function () {
    // field for private properties
    let privateData = new WeakMap();

    // constructor
    function Company(desc) {
        // we will add private fields to this WeakMap for security; key is .this
        privateData.set(this, {
            // private properties
            employees: [],
            // for real length of array with employees(unique indexes) array will be sparse
            countEmployees: 0,
            logs: []
        });

        this.name = desc["name"];
        this.owner = desc["owner"];
        // operator void used for returning the undefined value from Array.prototype.push() for ternary operator returning value
        this.maxCount = (desc["maxCompanySize"] >= 0) ? desc["maxCompanySize"] : void privateData.get(this).logs.push("company size has a start bad value");

        // logging
        this._createLogRecord(this.name, this.owner, true);
    }

    // method adds new employee to company(firing the employee with lowest salary if company is full of employees)
    Company.prototype.addNewEmployee = function (newEmployee) {
        // reference on private data
        let data = privateData.get(this);
        // checking if its Employee instance
        if (!this._isEmployee(newEmployee)) {
            console.error("Please try to add Employee instance");
            return;
        }
        // firing lowest salary employee if count of employees is maximum
        if (data.countEmployees >= this.maxCount) {
            this._removeEmployeeWithLowerSalary();
        }
        // add employee, increase count
        data.employees.push(newEmployee);
        newEmployee.hire(this);
        data.countEmployees++;
        // logging
        this._createLogRecord(newEmployee.name, true);
    };

    // method remove employee from company
    Company.prototype.removeEmployee = function (index) {
        // reference on private data
        let data = privateData.get(this);
        // checks if employee with this index exist
        if (index in data.employees) {
            // save name for logging
            let logName = data.employees[index].name;
            // remove the employee, decrement count of employees
            data.employees[index].fire(this);
            delete data.employees[index];
            data.countEmployees--;
            // logging
            this._createLogRecord(logName, false);
        }
        else {
            console.error("There are no employee with that index");
        }
    };

    Company.prototype.getAverageSalary = function () {
        return this._getAverageAgeOrSalary("salary");
    };

    Company.prototype.getAverageAge = function () {
        return this._getAverageAgeOrSalary("age");
    };

    // returns an array with employees
    Company.prototype.getEmployees = function () {
        return privateData.get(this).employees;
    };

    // returns a list of employees that work in company
    Company.prototype.getFormattedListOfEmployees = function () {
        let retList = "";
        // only arrow function for context(this)
        privateData.get(this).employees.forEach((el) => {
            retList += this._makeOneRecord(el) + "\n";
        });
        return retList;
    };

    // returns string representation of history of company
    Company.prototype.getHistory = function () {
        let stringHistory = "";
        // reference on private data
        let data = privateData.get(this);
        // creating history string
        for (let i = 0; i < data.logs.length; ++i) {
            stringHistory += data.logs[i] + "\n";
        }
        return stringHistory;
    };

    // private method. returns one record about employee
    Company.prototype._makeOneRecord = function (employee) {
        let retStr = `${employee.name}-works in ${employee.company} `;
        // 1000 for convert sec from millisec
        let time = (((new Date()) - employee.hireDate) / 1000).toFixed(2);
        return retStr + time + " seconds";
    };

    // Common private method for calculating average property.
    // It can be more ease if we was make get/set property instead of obligatory methods getSalary()/setSalary()
    Company.prototype._getAverageAgeOrSalary = function (propertyName) {
        let sum = 0;
        let propertyValue;
        // reference on private data
        let data = privateData.get(this);
        data.employees.forEach(function (el) {
            switch (propertyName) {
                case "age":
                    propertyValue = el.age;
                    break;
                case "salary":
                    propertyValue = el.getSalary();
                    break;
                default:
                    throw new Error("Bad name of property");
            }
            sum += propertyValue;
        });
        return sum / data.countEmployees;
    };

    // private method. Checks if argument is instance of Employee
    Company.prototype._isEmployee = function (employee) {
        return (employee && (Object.getPrototypeOf(employee).constructor === Employee));
    };

    // private method. Remove employee with lowest salary
    Company.prototype._removeEmployeeWithLowerSalary = function () {
        let employees = this.getEmployees();
        let minSalaryEmployee = Number.MAX_SAFE_INTEGER;
        let minSalaryEmployeeIndex;
        // finds the index(unique) of employee with lowest salary
        employees.forEach(function (el, ind) {
            if (minSalaryEmployee > el.getSalary()) {
                minSalaryEmployee = el.getSalary();
                minSalaryEmployeeIndex = ind;
            }
        });
        // removes employee using find index(minSalaryEmployeeIndex)
        this.removeEmployee(minSalaryEmployeeIndex);
    }

    Company.prototype._createLogRecord = function (employeeName, isHired, isStartRecord) {
        let stringRecord = "";
        if (isStartRecord) {
            // create start record
            stringRecord += `${this.name} was created in ` + new Date();
        }
        else {
            // create hire/fire record
            stringRecord += `${employeeName} `;
            stringRecord += (isHired) ? "starts " : "ends ";
            stringRecord += `working at ${this.name} in ` + new Date();
        }
        // save record to log
        privateData.get(this).logs.push(stringRecord);
    };

    // return constructor that don't duplicate methods and hide private fields
    return Company;
}());



// Test code section
let artem = new Employee({ name: "Artem", age: 15, salary: 1000, primarySkill: "UX" });
let vova = new Employee({ name: "Vova", age: 16, salary: 2000, primarySkill: "BE" });
let vasyl = new Employee({ name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE" });
let ivan = new Employee({ name: "Ivan", age: 35, salary: 5000, primarySkill: "FE" });
let orest = new Employee({ name: "Orest", age: 29, salary: 300, primarySkill: "AT" });
let anton = new Employee({ name: "Anton", age: 19, salary: 500, primarySkill: "Manager" });

let epam = new Company({ name: "Epam", owner: "Arkadii", maxCompanySize: 5 });
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

console.log(epam.getHistory());

epam.removeEmployee(2);

console.log(vasyl.getHistory());

console.log(epam.getAverageSalary()); // -> 2125
console.log(epam.getAverageAge());  // -> 21.25

epam.addNewEmployee(5, 6, 9, 5); // -> Please try to add Employee instance

setTimeout(() => {
    epam.removeEmployee(1);
    console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
}, 5000);

vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());
var mongoose = require('mongoose');

module.exports = mongoose.model('Scrum', {
    scrumName : String,
    startDate : Date,
    endDate : Date,
    item : [
        {
            itemName : String,
            tasks : [
                {
                    taskName : String,
                    status : String,
                    asignedTo : String,
                    timeEstimate : Number
                }

            ]
        }
    ]
});
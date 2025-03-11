import  { reminderDatabase }  from "./reminder";

const remindDB = new reminderDatabase();

//creating reminders
const id1 = remindDB.createReminder({
    title: 'Reminder',
    description: 'Complete the reminder project',
    dueDate: '2025-03-10'
});

const id2 = remindDB.createReminder({
    title: 'Drink Water',
    description: 'Drink 5 liters of water',
    dueDate: '2025-03-15'
});

const id3 = remindDB.createReminder({
    title: 'Charge Laptop',
    description: 'Charge till 80%',
    dueDate: '2025-03-12'
});

const id4 = remindDB.createReminder({
    title: 'Shopping',
    description: 'Grocery Shopping',
    dueDate: '2025-03-02'
});


console.log('First-Time Creation:\n')
console.log(remindDB.getAllReminders());




//updating reminders
remindDB.updateReminder(id3, {
    title: 'Go for a Sprint',
    description: 'Complete 500m in 2 minutes'
});

console.log("\nReminders after updating the third one:");
console.log(remindDB.getAllReminders());





//remove 
remindDB.removeReminder(id4);
console.log('After removing the fourth reminder:');
console.log(remindDB.getAllReminders());





//mark as completed
remindDB.markReminderAsCompleted([id1, id2, id3]);
console.log("\nReminders after marking completed:");
console.log(remindDB.getAllReminders());

//getting all marked as completed reminders
remindDB.getAllRemindersMarkedAsCompleted();



//mark aas incomplete
remindDB.unmarkReminderAsCompleted([id2, id3]);
console.log("\nReminders after marking the second and third as incomplete:");
console.log(remindDB.getAllReminders());

//getting all unmarked as completed reminders
remindDB.getAllRemindersNotMarkedAsCompleted();


//getting undue reminders
remindDB.getAllRemindersDueByToday();











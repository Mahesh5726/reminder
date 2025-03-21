type reminder = {
    id?: string | null;
    title?: string;
    description?: string;
    dueDate?: string;
    isCompleted?: boolean;
}

export class reminderDatabase {
    private remind:  Map<string, reminder> = new Map();

    exists(id: string): boolean{
        return this.remind.has(id);
    }

    createReminder(reminder: reminder): string{
        let id = Math.random().toString(36).substring(2, 11);
        reminder.id = id;
        reminder.isCompleted = false;
        this.remind.set(id, reminder);
        console.log(`Reminder created successfully with id: ${id}`);
        return id;
    }

    getReminder(id: string): reminder | null{
        return this.remind.get(id) || null;
    }

    getAllReminders(): reminder[]{
        return Array.from(this.remind.values());
    }

    removeReminder(id: string): void{
        if(!this.exists(id)){
            console.log("\nReminder not found\n");
            return;
        }
        this.remind.delete(id);
        console.log('Reminder removed successfully');
    }

    updateReminder(id: string, reminder: reminder): void{
        if(!this.exists(id)){
            console.log("\nReminder not found\n");
            return;
        }
        const existingReminder = this.remind.get(id);
        const newReminder = { ...existingReminder, ...reminder, id };
        this.remind.set(id, newReminder);
        console.log('Reminder updated successfully');
    }

    markReminderAsCompleted(ids: string[] ): string[]{
            ids.forEach(id => {if(!this.exists(id)){
                console.log("\nReminder not found\n");
                return;
            }
            const reminder = this.remind.get(id)!;
            reminder.isCompleted = true;
            this.remind.set(id, reminder);
            console.log('Reminder marked as completed');
        });
        return ids;
    }

    getAllRemindersMarkedAsCompleted(): string[] | {} {
        const completedReminders = Array.from(this.remind.values()).filter(reminder => reminder.isCompleted);
        console.log('Completed Reminders:\n');
        console.log(completedReminders);
        return completedReminders.map(reminder => reminder.id!);
    }

    unmarkReminderAsCompleted(ids: string[]): string[] {
            ids.forEach(id => {if(!this.exists(id)){
                console.log("\nReminder not found\n");
                return;
            }
            const reminder = this.remind.get(id)!;
            reminder.isCompleted = false;
            this.remind.set(id, reminder);
            console.log('Reminder unmarked as completed');
        });
        return ids;
    }

    getAllRemindersNotMarkedAsCompleted(): string[] | {}{
        const incompletedReminders = Array.from(this.remind.values()).filter(reminder => !reminder.isCompleted);
        console.log('\nIncompleted Reminders:\n');
        console.log(incompletedReminders);
        return incompletedReminders.map(reminder => reminder.id!);
    }

    getAllRemindersDueByToday(): string[] {
        const today =  new Date();
        today.setHours(0, 0, 0, 0);

        const remindersDueByToday = Array.from(this.remind.values()).filter(reminder => {
            if (!reminder.dueDate) {
                return false;
            }
            const dueDate = new Date(reminder.dueDate);
            return dueDate < today;
        }); 

        console.log('\nReminders due by today:\n');
        if (remindersDueByToday.length === 0) {
            console.log('No reminders found\n');
        }
        else{
            console.log(remindersDueByToday);
        }
        return remindersDueByToday.map(reminder => reminder.id!);
    }
}
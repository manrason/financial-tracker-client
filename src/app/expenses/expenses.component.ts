import { Component } from '@angular/core';
import { Expense } from './expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  expense: Expense ={
    expenseId: 1,
    name: "titre",
    amount: 10.25,
    creationDate: new Date(),
    comments: "commentaire"
  };
}

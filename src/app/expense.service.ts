import { Injectable } from '@angular/core';
import { Expense } from './expenses/expense';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  private expensesUrl = 'localhost:8080/api/v1/expenses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getExpenses(): Observable<Expense[]>{
    return this.http.get<Expense[]>(`${this.expensesUrl}/get`)
    .pipe(catchError(this.handleError<Expense[]>('getExpenses',[])));
  }

  getExpense(id: number): Observable<Expense> {
    const url = `${this.expensesUrl}/${id}`;
    return this.http.get<Expense>(url).pipe(
      catchError(this.handleError<Expense>(`getExpense id=${id}`))
    );
}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
  
}
addExpense(expense: Expense): Observable<Expense> {
  return this.http.post<Expense>(this.expensesUrl, expense, this.httpOptions).pipe(
    catchError(this.handleError<Expense>('addExpense'))
  );
}

/** DELETE: delete the hero from the server */
deleteExpense(id: number): Observable<Expense> {
  const url = `${this.expensesUrl}/${id}`;

  return this.http.delete<Expense>(url, this.httpOptions).pipe(
    catchError(this.handleError<Expense>('deleteExpense'))
  );
}


}

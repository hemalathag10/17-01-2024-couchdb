import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = 'http://localhost:5984';
  private adminCredentials = 'admin:admin'; // Replace with your CouchDB admin credentials


  constructor(private http: HttpClient) {}

  getDocument(databaseName: string, documentId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(this.adminCredentials)}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}/${databaseName}/${documentId}`, { headers }).pipe(
      tap(response => console.log('Document retrieved:', response)),
      catchError(error => {
        console.error('Error getting document:', error);
        return throwError(error); // Re-throw the error using throwError
      })
    );
  }
 // blog.service.ts

filterDocumentsByAuthor(databaseName: string, authorName: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
  });

  const filterCriteria = {
    author: authorName,
  };

  return this.http.post(`${this.baseUrl}/${databaseName}/_find`, { selector: filterCriteria }, { headers }).pipe(
    tap(response => console.log('Filtered documents:', response)),
    catchError(error => {
      console.error('Error filtering documents:', error);
      return throwError(error);
    })
  );
}


updateDocument(databaseName: string, documentId: string, newData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin') // Include your CouchDB credentials
  });

  return this.http.put(`${this.baseUrl}/${databaseName}/${documentId}`, newData, { headers }).pipe(
    tap(response => console.log('Document updated:', response)),
    catchError(error => {
      console.error('Error updating document:', error);
      return throwError(error);
    })
  );
}


  

  // Add a new blog post
  addPost(post: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}`, post, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding post:', error);
        return throwError(error);
      })
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin'),
      'Content-Type': 'application/json',
    });
  }
}

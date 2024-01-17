import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  newPostForm!: FormGroup;
  posts: any[] = [];
  
generatedDocumentId:string='unique_post_id1'
  constructor(private blogService: BlogService, private fb: FormBuilder) {}

  ngOnInit() {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.getDocument();
  }

  getDocument(): void {
   

    this.blogService.getDocument('demo', this.generatedDocumentId).subscribe(
      (response) => console.log('Document retrieved:', response),
      (error) => console.error('Error getting document:', error)
    );
  }

  // blog.component.ts

// ...

filterDocumentsByAuthor() {
  const databaseName = 'demo';
  const authorName = 'dfjds';

  this.blogService.filterDocumentsByAuthor(databaseName, authorName).subscribe(
    data => {
      // Handle the filtered documents response here
      console.log('Filtered documents by author:', data);
    },
    error => {
      // Handle error
      console.error('Error filtering documents by author:', error);
    }
  );
}
// blog.component.ts

updateDocument() {
  const databaseName = 'demo'; // Replace with your actual database name
  const documentId = 'f3eb75f6f4fa592e610fbcca8200cc92'; // Replace with the ID of the document you want to update
  const newData = { title: 'harry potter' }; // Replace with the actual structure of your document

  this.blogService.updateDocument(databaseName, documentId, newData).subscribe(
    data => {
      console.log('Document updated successfully:', data);
    },
    error => {
      console.error('Error updating document:', error);
    }
  );
}


  



  onSubmit() {
    const { title, content } = this.newPostForm.value;

    this.blogService.addPost({ title, content }).subscribe(
      () => {
        console.log('Post added successfully!');
        this.newPostForm.reset();
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }
}
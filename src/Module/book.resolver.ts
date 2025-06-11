import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.model';

@Resolver(() => Book)
export class BookResolver {
    private books: Book[] = [
        { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
        { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt' },
    ];

    @Query(() => [Book])
    getBooks(): Book[] {
        return this.books;
    }

    @Query(() => Book, { nullable: true })
    getBook(@Args('id', { type: () => Int }) id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    @Mutation(() => Book)
    addBook(
        @Args('title') title: string,
        @Args('author') author: string,
    ): Book {
        const newBook: Book = {
            id: this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1,
            title,
            author,
        };
        this.books.push(newBook);
        return newBook;
    }
    
    @Mutation(() => Boolean)
    deleteBook(@Args('id', { type: () => Int }) id: number): boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) return false;
        this.books.splice(index, 1);
        return true;
    }
}

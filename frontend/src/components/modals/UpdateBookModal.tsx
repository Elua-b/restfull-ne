import React, { FC, useEffect, useState } from "react";
import MainModal from "./mainModal"; // Assuming MainModal is located in the same directory
import { Button } from "../Button";
import { FiEdit } from "react-icons/fi";
import { TextField } from "../Fields";
import Loader from "../Loader";
import { ILibraryID } from "@/types";
import { AuthAPi } from "@/api";


interface UpdateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: ILibraryID;
  getBooks: Function;
}

const UpdateBookModal: FC<UpdateLibraryModalProps> = ({
  isOpen,
  onClose,
  book,
  getBooks,
}) => {
  console.log(book);
  
  const [updatedBook, setUpdatedBook] = useState<ILibraryID>({
    id: book.id,
    name: book.name,
    author: book.author,
    publicYear: book.publicYear,
    publisher: book.publisher,
    subject: book.subject,
  });

  const [loading, setLoading] = useState(false);

  // Update state when book prop changes
 
console.log(book.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      
      const response = await AuthAPi.put(`/book/update/${book?.id}`, updatedBook);

      console.log("Book updated:", { ...response.data });
      getBooks();
      onClose();

    } catch (error) {
      console.error("Error updating Book:", error);
    }
    setLoading(false);
  };

  return (
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="md"
      centered
    >
      <div className="flex w-full flex-col items-center gap-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <FiEdit className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-medium text-gray-600">
          Update Book Details
        </h2>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          id="name"
          label="name"
          value={updatedBook.name}
          onChange={handleChange}
          name="name"
          type="text"
          autoComplete="name"
          required
        />
        <TextField
          id="author"
          label="Author"
          value={updatedBook.author}
          onChange={handleChange}
          name="author"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          id="publicYear"
          label="Publication Year"
          value={updatedBook.publicYear}
          onChange={handleChange}
          name="publicYear"
          type="text"
          autoComplete="publicYear"
          required
        />
        <TextField
          id="publisher"
          label="Publisher"
          value={updatedBook.publisher}
          onChange={handleChange}
          name="publisher"
          type="text"
          autoComplete="off"
          required
        />
        <TextField
          id="subject"
          label="Subject"
          value={updatedBook.subject}
          onChange={handleChange}
          name="subject"
          type="text"
          autoComplete="off"
          required
        />
        
        <div className="col-span-full">
          <Button
            disabled={loading}
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
          >
            {loading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-50" />
            ) : (
              <span>{loading ? <Loader /> : "Update Book"}</span>
            )}
          </Button>
        </div>
      </form>
    </MainModal>
  );
};

export default UpdateBookModal;

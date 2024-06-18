import React, { FC, useState } from "react";
import MainModal from "./mainModal";
import { Button } from "../Button";
import { FiPlus } from "react-icons/fi";
import { TextField } from "../Fields";
import Loader from "../Loader";
import { ILibrary } from "@/types";
import { AuthAPi } from "@/api";

// add user props
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  getBooks: Function;
}

const AddBookModal: FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  getBooks,
}) => {
  // book state 
  const [book, setBook] = useState<ILibrary>({
    name: "",
    publisher: "",
    publicYear: "",
    subject: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);
// handle change function  to handle inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
 // handle submit function to submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {

      const response = await AuthAPi.post("/book/create", book);
      console.log("Book created:", response.data);
      getBooks();
    } catch (error) {
      console.error("Error creating book:", error);
    }
    setLoading(false);
  };
  return (
    <MainModal isOpen={isOpen} onClose={onClose} title="" size="md" centered>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <FiPlus className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-medium text-gray-600">
          Add A new Book{" "}
        </h2>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          id="name"
          label="name"
          value={book.name}
          onChange={handleChange}
          name="name"
          type="text"
          autoComplete="name"
          required
        />
        <TextField
          id="author"
          label="author"
          value={book.author}
          onChange={handleChange}
          name="author"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          id="publisher"
          label="publisher"
          value={book.publisher}
          onChange={handleChange}
          name="publisher"
          type="text"
          autoComplete="publisher-name"
          required
        />
        <TextField
          id="publicYear"
          label="publication Year"
          value={book.publicYear}
          onChange={handleChange}
          name="publicYear"
          type="text"
          autoComplete="off"
          required
        />
        <TextField
          id="subject"
          label="Subject"
          value={book.subject}
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
              <span>{loading ? <Loader /> : "Create Book"}</span>
            )}
          </Button>
        </div>
      </form>{" "}
    </MainModal>
  );
};

export default AddBookModal;

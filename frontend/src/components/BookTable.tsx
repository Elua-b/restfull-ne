import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { analyticsData } from "./data";

import { TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "./pagination/TablePaginationActions";
import { Button } from "./Button";
import { FiPlus } from "react-icons/fi";

import AddBookModal from "./modals/AddBookModal";
import { AuthAPi } from "@/api";
import { ILibraryID } from "@/types";

import UpdateLibraryModal from "./modals/UpdateBookModal";

const BookTable = () => {

  const [books, setBooks] = useState<ILibraryID[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectBook, setSelectBook] = useState<ILibraryID | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
// get books function to get all books
  const getBooks = async () => {
    try {
      const res = await AuthAPi.get("/book/books");

      console.log(res.data.Books);
      setBooks(res.data.Books);
    } catch (error) {
      console.log(error);
    }
  };
  // use effect to get books
  useEffect(() => {
    setBooks(books);
    getBooks();
  }, []);
// open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };
// close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // handle change page function to handle page change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
// handle change rows per page function to handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // open edit modal function
  const openEditModal = (book: ILibraryID) => {
    setSelectBook(book);
    setIsEditModalOpen(true);
  };
// close edit modal function
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectBook(null);
  };
  // handle delete function to delete a book
  const handleDelete = async (id: number) => {
    try {
      const res = await AuthAPi.delete(`/book/delete/${id}`);
      if (res.status === 200) {
        setBooks(books.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // filter books function to filter books
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 pt-10 w-full md:w-[85w]">
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-700">Books</h2>
          <p className="text-gray-500">Manage your Books here.</p>
        </div>
        <div className="flex justify-center gap-4">
          <div>
            <input
              type="text"
              placeholder="Search for Books"
              className="w-full  rounded-md border border-gray-300 p-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={openModal}
            color="blue"
            className="space-x-2 rounded-md"
          >
            <span>Add Book</span>
            <FiPlus className="text-lg" />
          </Button>
        </div>

        <AddBookModal
          getBooks={getBooks}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
      <div className="pt-3">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} className="" aria-label="simple table">
            <TableHead className="">
              <TableRow className="font-lato rounded-lg bg-slate-200 font-bold">
                <TableCell>Id</TableCell>

                <TableCell align="right">Book Name</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Publisher</TableCell>
                <TableCell align="right">PublicationYear</TableCell>
                <TableCell align="right">Subject</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredBooks?.slice(
                    page * rowsPerPage,
                    // Use Math.min to avoid exceeding array bounds
                    Math.min(
                      page * rowsPerPage + rowsPerPage,
                      filteredBooks.length,
                    ),
                  )
                : filteredBooks
              ).map((book, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="right">{book.id}</TableCell>
                    
                    <TableCell align="right">{book.name}</TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">{book.publisher}</TableCell>
                    <TableCell align="right">{book.publicYear}</TableCell>
                    <TableCell align="right">{book.subject}</TableCell>


                    <TableCell align="right">
                      <div className="flex w-full items-center  justify-center">
                        <Button
                          color="red"
                          className="mr-4 gap-4 space-x-2 rounded-md"
                          onClick={() => handleDelete(book.id)}
                        >
                          <span>Delete</span>
                        </Button>
                        <Button
                          color="blue"
                          className="space-x-2 rounded-md"
                          onClick={() => openEditModal(book)}
                        >
                          <span>Edit</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-white">
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={9}
                  count={analyticsData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  className="flex w-full items-center justify-center"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      {selectBook && (
        <UpdateLibraryModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          book={selectBook}
          getBooks={getBooks}
        />
      )}
    </div>
  );
};

export default BookTable;

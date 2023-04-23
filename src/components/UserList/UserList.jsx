import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getAllUsers, getUsersPagination } from "../../service/userService";

import ReactPaginate from "react-paginate";
import AddUserModal from "./Modal/AddUserModal";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };
  useEffect(() => {
    // const fetchUsers = async () => {
    //   const users = await getAllUsers();
    //   setUsers(users);
    // };
    // fetchUsers();

    const fetchUsersPagination = async () => {
      const result = await getUsersPagination(currentPage * limit, limit);
      const {
        DT: { rows, count },
      } = result;
      setPageCount(Math.ceil(count / limit));
      setUsers(rows);
    };
    fetchUsersPagination();
  }, [currentPage]);

  return (
    <>
      <div className="table">
        <h1>User Table</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary mb-3 "
        >
          Add User
        </button>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Numbers</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
              <th scope="col">Group</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{currentPage * limit + index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.sex}</td>
                <td>{user.Group?.name}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table__footer">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
      <AddUserModal show={showModal} onHide={handleCloseModal} />
    </>
  );
}

export default UserList;

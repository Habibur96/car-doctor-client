import React from "react";
 

const BookingsRow = ({ booking, handleDelete }) => {
  const { _id, cousterName, date, service, price, img } = booking;
 

  return (
    <tr>
      <th>
        <button onClick={() => handleDelete(_id)} className="btn btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
      <td>
        <div className="avatar">
          <div className="rounded w-24 h-24">
            {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
          </div>
        </div>
      </td>
      <td>{cousterName}</td>
      <td>{service}</td>
      <td>{date}</td>
      <td>${price}</td>
    </tr>
  );
};

export default BookingsRow;

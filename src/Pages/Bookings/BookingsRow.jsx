import React from "react";

const BookingsRow = ({ booking }) => {
  const { cousterName, date, service, price, img } = booking;
  
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
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

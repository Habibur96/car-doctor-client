import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const BookService = () => {
  const services = useLoaderData();
  const { title, _id, price, img } = services;
  //   console.log(services);
  const { user } = useContext(AuthContext);
  // console.log("user", user);

  const handleBookSerevice = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;

    const email = user?.email;

    const booking = {
      cousterName: name,
      email,
      date,
      img,
      service: title,
      service_id: _id,
      price: price,
    };
    form.reset("");
    console.log("Booking", booking);

    fetch("https://car-doctor-server-habibur96.vercel.app/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // alert("Service book successfully");
          Swal.fire({
            title: "Service book successfully",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
  };

  return (
    <div className="card-body">
      <h2 className="text-center text-3xl">Book Services</h2>
      <form onSubmit={handleBookSerevice}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input type="date" name="date" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              defaultValue={user?.email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due amount</span>
            </label>
            <input
              type="text"
              defaultValue={"$" + price}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <input
            className="btn btn-primary "
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default BookService;

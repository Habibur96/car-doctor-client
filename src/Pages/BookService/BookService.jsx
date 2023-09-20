import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const BookService = () => {
  const services = useLoaderData();
  const { title, _id, price } = services;
  console.log(services);
  const { user } = useContext(AuthContext);
  const handleCheckOut = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.namne.value;
    const date = form.date.value;
    const email = user?.email;

    const order = {
      cousterName: name,
      email,
      date,
      service: _id,
      price: price,
    };
    console.log(order);
  };

  return (
    <div className="card-body">
      <h2 className="text-center text-3xl">Book Services</h2>
      <form onSubmit={handleCheckOut}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              typeof="name"
              placeholder="name"
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input type="date" className="input input-bordered" />
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
            className="btn btn-primary btn-blok"
            type="button"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default BookService;

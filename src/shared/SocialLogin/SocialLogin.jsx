import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const gglLogedIn = result.user;
        console.log(gglLogedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="text-center">
        <button
          onClick={handleGoogleLogIn}
          className="btn btn-circle btn-outline"
        >
          G
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PortfolioDetails = () => {
	const { userPortfolios } = useLoaderData();
      const currentUser = useSelector((state) => state.session.user);
      const navigate = useNavigate();

      console.log("MADE IT", userPortfolios);

	// Ensure user is logged in
	useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
      }, [currentUser, navigate]);
      
      return (
            <div id="all-user-portfolios">
                  <h1>Portfolios</h1>
            </div>
      )
};

export default PortfolioDetails;

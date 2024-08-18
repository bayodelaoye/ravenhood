import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import OpenModalButton from "../OpenModalButton";
import UpdateProfileModal from "./UpdateProfileModal";
import InvestingsModal from "./InvestingsModal";
import { FaCircleInfo } from "react-icons/fa6";
import DeletePortfolio from ""

const UserProfilePage = () => {
	const { userPortfolios } = useLoaderData();
	const [image, setImage] = useState(userPortfolios.image);
	const handleImageChange = (newImage) => {
		setImage(newImage);
	};
	const currentUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();
	const portfolios = userPortfolios.portfolios.map((portfolio) => portfolio);
	const totalAmount = portfolios.reduce((acc, curr) => {
		return acc + +curr.total_amount;
	}, 0);
	const cashBalance = portfolios.reduce((acc, curr) => {
		return acc + +curr.cash_balance;
	}, 0);

	// Ensure user is logged in
	useEffect(() => {
		if (!currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	// Ensure user is the portfolio owner
	useEffect(() => {
		if (currentUser && userPortfolios.id !== currentUser.id) {
			navigate("/");
		}
	}, [userPortfolios, currentUser, navigate]);

	return (
		<div id="user-profile-portfolio">
			<div id="follow-in-line">
				<Profile
					userPortfolios={{ ...userPortfolios, image }}
					onImageChange={handleImageChange}
				/>
				<OpenModalButton
					buttonText={`Edit Profile`}
					style={{
						cursor: `pointer`,
						textDecoration: `underline`,
						fontWeight: `bold`,
						border: `none`,
						margin: `0`,
						fontFamily: `Lato, sans-serif`,
						fontSize: `15px`,
					}}
					userPortfolios={userPortfolios}
					onImageChange={handleImageChange}
					modalComponent={
						<UpdateProfileModal
							userPortfolios={userPortfolios}
							onImageChange={handleImageChange}
						/>
					}
				/>
			</div>
			<div id="portfolio-profile-overview">
				{!userPortfolios.portfolios.length ? (
					<>
						<div id="add-portfolio">
							<div id="portfolio-total-balance">
								<h2>$0.00</h2>
								<p>Total in Ravenhood</p>
							</div>
							<div>
								<Link to="/portfolios/new" id="new-portfolio-link">
									Add portfolio
								</Link>
							</div>
						</div>
						<div className="individual-portfolio-investing">
							<div className="individual-investing-port">
								<h2>Individual Investing</h2>
								<OpenModalButton
									buttonText={
										<span style={{ display: "flex", alignItems: "center" }}>
											<FaCircleInfo
												style={{
													marginRight: "5px",
													marginBottom: "10px",
												}}
											/>
										</span>
									}
									style={{
										background: `none`,
										color: `#B4B1B1`,
										padding: 0,
										border: `none`,
										cursor: `pointer`,
										fontSize: `15px`,
									}}
									modalComponent={<InvestingsModal />}
								/>
							</div>
							<hr />
							<div>
								<div>
									<p>Total Individual Value</p>
									<p>$0.00</p>
								</div>
								<div>
									<p>Individual Holdings</p>
									<p>$0.00</p>
								</div>
								<div>
									<p>Individual cash</p>
									<p>$0.00</p>
								</div>
								<div>
									<p>Crypto Holdings</p>
									<p> - </p>
								</div>
							</div>
						</div>
						<div>
							<div id="profile-overview">
								<h1>Overview</h1>
								<div className="circle-container">
									<div className="circle">
										<h4>Stocks</h4>
										<h4>100%</h4>
									</div>
									<div className="circle">
										<h4>ETFs</h4>
										<h4>0%</h4>
									</div>
									<div className="circle">
										<h4>Options</h4>
										<h4>0%</h4>
									</div>
									<div className="circle">
										<h4>Crypto</h4>
										<h4>0%</h4>
									</div>
								</div>
							</div>
						</div>
						<div>
							<p>Stocks are pieces of a company that investors can own.</p>
						</div>
					</>
				) : (
					<>
						<div id="add-portfolio">
							<div id="portfolio-total-balance">
								<h2>${totalAmount}</h2>
								<p>Total in Ravenhood</p>
							</div>
							<div>
								<Link to="/portfolios/new" id="new-portfolio-link">
									Add portfolio
								</Link>
							</div>
						</div>
						<div className="individual-portfolio-investing">
							<div className="individual-investing-port">
								<h2>Individual Investing</h2>
								<OpenModalButton
									buttonText={
										<span style={{ display: "flex", alignItems: "center" }}>
											<FaCircleInfo
												style={{
													marginRight: "5px",
													marginBottom: "10px",
												}}
											/>
										</span>
									}
									style={{
										
									}}
									modalComponent={< />}
								/>
							</div>
							<hr />
							<div>
								<div>
									<p>Total Individual Value</p>
									<p>${totalAmount}</p>
								</div>
								<div>
									<p>Individual Holdings</p>
									<p>$0.00</p>
								</div>
								<div>
									<p>Individual cash</p>
									<p>${cashBalance}</p>
								</div>
								<div>
									<p>Crypto Holdings</p>
									<p> - </p>
								</div>
							</div>
						</div>

						{userPortfolios.portfolios.map((portfolio) => (
							<div key={portfolio.id}>
								<div className="individual-portfolio-investing">
									<div className="individual-investing-port">
										<h2>{portfolio.portfolio_name}</h2>
										<Link to={`/portfolios/${currentUser.id}/edit`}>
											<button>Update</button>
										</Link>
										<OpenModalButton
											buttonText="Delete"
											style={{
												backgroundColor: `none`,
												color: `#B4B1B1`,
												padding: 0,
												border: `none`,
												cursor: `pointer`,
												fontSize: `15px`,
											}}
											modalComponent={<InvestingsModal />}
										/>
									</div>
									<hr />
									<div>
										<div>
											<p>Total Individual Value</p>
											<p>${portfolio.total_amount}</p>
										</div>
										<div>
											<p>Individual Holdings</p>
											<p>$0.00</p>
										</div>
										<div>
											<p>Individual cash</p>
											<p>${portfolio.cash_balance}</p>
										</div>
										<div>
											<p>Crypto Holdings</p>
											<p> - </p>
										</div>
									</div>
								</div>
							</div>
						))}
					</>
				)}
				<footer>
					<span>
						All investing involves risk, including the loss of principal.
						Brokerage Holdings include securities and related products offered
						by registered broker-dealer Ravenhood Financial LLC, member SIPC.
						Crypto Holdings are offered by Ravenhood Crypto, LLC, are not
						securities, and are not covered by SIPC. Ravenhood Crypto holdings
						are not offered by Ravenhood&apos;s broker-dealer and are therefore
						not subject to the same regulatory protections as those offered by
						Ravenhood Financial.
						<br />
						<br />
						Cryptocurrency accounts are offered through Ravenhood Crypto, LLC
						(&quot;RHC&quot;) (NMLS ID: 1702840). Spending accounts are offered
						through Ravenhood Money, LLC (&quot;RHY&quot;) (NMLS ID: 1990968), a
						licensed money transmitter. RHF, RHY, RHC and RHS are affiliated
						entities and wholly owned subsidiaries of Ravenhood Markets, Inc.
						RHF, RHY, RHC and RHS are not banks. Securities products offered by
						RHF are not FDIC insured and involve risk, including possible loss
						of principal. Cryptocurrencies held in RHC accounts are not FDIC
						insured nor SIPC protected. RHY products are not subject to SIPC
						protection but funds held in the spending account and card account
						may be eligible for FDIC pass-through insurance.
						<br />
						<br />
						Certain fundamental, market data, or other information is provided
						directly or indirectly by, or based on information provided by,
						third party data providers, which may include FactSet Research
						Systems, Inc. (Copyright © 2021 FactSet Research Systems Inc. All
						rights reserved.), Morningstar, Inc. (Copyright © 2021 Morningstar.
						All rights reserved.), and/or other third party providers. Ravenhood
						does not make any warranty or guarantee relating to the accuracy,
						timeliness or completeness of any third-party information. Any
						Morningstar information (1) is proprietary to Morningstar and/or its
						content providers; (2) may not be copied or distributed; and (3) is
						not warranted to be accurate, complete or timely. Third party data
						providers and their content providers are not responsible for any
						damages or losses arising from any use of this information. Past
						performance is no guarantee of future results. The provision of this
						information does not constitute investment advice or a
						recommendation of any security, transaction, account type,
						investment strategy involving securities, or order.
					</span>
				</footer>
			</div>
		</div>
	);
};

export default UserProfilePage;

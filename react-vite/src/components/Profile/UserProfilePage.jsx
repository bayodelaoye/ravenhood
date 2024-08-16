import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Profile from "./Profile";
import OpenModalButton from "../OpenModalButton";
import UpdateProfileModal from "./UpdateProfileModal";
import InvestingsModal from "./InvestingsModal";
import { FaCircleInfo } from "react-icons/fa6";

const UserProfilePage = () => {
	const { userPortfolios } = useLoaderData();
	const [image, setImage] = useState(userPortfolios.image);
	const handleImageChange = (newImage) => {
		setImage(newImage);
	};

	// console.log("portfolios", userPortfolios);

	return (
		<div>
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
			<div id="portfolio-profile-overview">
				{userPortfolios.portfolios.map((portfolio) => (
					<>
						<div id="add-portfolio">
							<div id="portfolio-total-balance">
								<h2>${portfolio.total_amount}</h2>
								<p>Total in Ravenhood</p>
							</div>
							<div>
								<Link to="/portfolios/new" id="new-portfolio-link">Add portfolio</Link>
							</div>
						</div>
						<div id="individual-portfolio-investing">
							<h2>Individual Investing</h2>
							<div>
								<OpenModalButton
									buttonText={
										<span style={{ display: "flex", alignItems: "center" }}>
											<FaCircleInfo style={{ marginRight: "5px" }} />
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
									<p>${portfolio.total_amount}</p>
								</div>
								<div>
									<p>Individual Holdings</p>
									<p>${portfolio.total_amount - portfolio.cash_balance}</p>
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
					</>
				))}
				<div id="profile-overview">
					<div>
						<h1>Overview</h1>
						<div>
							<div>
								<h4>Stocks</h4>
								<h4>0%</h4>
							</div>
							<div>
								<h4>ETFs</h4>
								<h4>0%</h4>
							</div>
							<div>
								<h4>Options</h4>
								<h4>0%</h4>
							</div>
							<div>
								<h4>Crypto</h4>
								<h4>0%</h4>
							</div>
						</div>
					</div>
					<p>Stocks are pieces of a company that investors can own.</p>
				</div>
			</div>
			<footer>
				<span>
					All investing involves risk, including the loss of principal.
					Brokerage Holdings include securities and related products offered by
					registered broker-dealer Ravenhood Financial LLC, member SIPC. Crypto
					Holdings are offered by Ravenhood Crypto, LLC, are not securities, and
					are not covered by SIPC. Ravenhood Crypto holdings are not offered by
					Ravenhood&apos;s broker-dealer and are therefore not subject to the same
					regulatory protections as those offered by Ravenhood Financial.
					<br />
					<br />
					Cryptocurrency accounts are offered through Ravenhood Crypto, LLC
					(&quot;RHC&quot;) (NMLS ID: 1702840). Spending accounts are offered through
					Ravenhood Money, LLC (&quot;RHY&quot;) (NMLS ID: 1990968), a licensed money
					transmitter. RHF, RHY, RHC and RHS are affiliated entities and wholly
					owned subsidiaries of Ravenhood Markets, Inc. RHF, RHY, RHC and RHS
					are not banks. Securities products offered by RHF are not FDIC insured
					and involve risk, including possible loss of principal.
					Cryptocurrencies held in RHC accounts are not FDIC insured nor SIPC
					protected. RHY products are not subject to SIPC protection but funds
					held in the spending account and card account may be eligible for FDIC
					pass-through insurance.
					<br />
					<br />
					Certain fundamental, market data, or other information is provided
					directly or indirectly by, or based on information provided by, third
					party data providers, which may include FactSet Research Systems, Inc.
					(Copyright © 2021 FactSet Research Systems Inc. All rights reserved.),
					Morningstar, Inc. (Copyright © 2021 Morningstar. All rights
					reserved.), and/or other third party providers. Ravenhood does not
					make any warranty or guarantee relating to the accuracy, timeliness or
					completeness of any third-party information. Any Morningstar
					information (1) is proprietary to Morningstar and/or its content
					providers; (2) may not be copied or distributed; and (3) is not
					warranted to be accurate, complete or timely. Third party data
					providers and their content providers are not responsible for any
					damages or losses arising from any use of this information. Past
					performance is no guarantee of future results. The provision of this
					information does not constitute investment advice or a recommendation
					of any security, transaction, account type, investment strategy
					involving securities, or order.
				</span>
			</footer>
		</div>
	);
};

export default UserProfilePage;

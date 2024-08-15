import { Outlet } from "react-router-dom";
import {
	FaXTwitter,
	FaInstagram,
	FaLinkedin,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
	return (
		<div id="nu-footer-div">
			<footer id="nu-footer">
				<div id="top-nu-footer">
					<section className="left-nu-footer" id="top-left-nu-footer">
						<a href="#" target="_blank" rel="noopener noreferrer">
							<h2 className="nu-footer-documents">
								Brokerage Customer Relationship Summary
							</h2>
						</a>
						<div id="big-line"></div>
						<a href="#" target="_blank" rel="noopener noreferrer">
							<h2 className="nu-footer-documents">FINRA&apos;s BrokerCheck</h2>
						</a>
					</section>
					<section className="right-nu-footer" id="top-right-nu-footer">
						Follow us on
						<FaXTwitter />
						<FaInstagram />
						<FaLinkedin />
						<FaTiktok />
						<FaYoutube />
					</section>
				</div>
				<div id="bottom-nu-footer">
					<section className="left-nu-footer" id="bottom-left-nu-footer">
						<div className="bottom-nu-footer-headers">
							<h3>DEMOCRATIZE FINANCE FOR ALL™</h3>
						</div>
						<div id="bottom-nu-footer-links">
							<div className="footer-column">
								<h4>Product</h4>
								<ul>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Invest
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Credit Card
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Platinum
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Crypto
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Retirement
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Options
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Learn
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Snacks
										</a>
									</li>
								</ul>
							</div>
							<div className="footer-column">
								<h4>Company</h4>
								<ul>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											About us
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Blog
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Affiliates
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Press
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Careers
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Commitments
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Our Customers
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Investor Relations
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Support
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											ESG
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Podcast
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Investor Index
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Ravenhood Merch
										</a>
									</li>
								</ul>
							</div>
							<div className="footer-column">
								<h4>Legal & Regulatory</h4>
								<ul>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Terms & Conditions
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Disclosures
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Privacy
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Your Privacy Choices
										</a>
									</li>
									<li>
										<a href="#" target="_blank" rel="noopener noreferrer">
											Law Enforcement Requests
										</a>
									</li>
								</ul>
							</div>
						</div>
					</section>
					<section className="right-nu-footer" id="bottom-right-nu-footer">
						<h3>PARTICIPATION IS POWER™</h3>
						<p>All investing involves risk.</p>
						<p>
							Brokerage services are offered through Ravenhood Financial LLC,
							(“RHF”) a registered broker-dealer (member{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								SIPC
							</a>
							) and clearing services through Ravenhood Securities, LLC, (“RHS”)
							a registered broker dealer (member{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								SIPC
							</a>
							). Cryptocurrency services are offered through Ravenhood Crypto,
							LLC (“RHC”) (NMLS ID: 1702840). Review a{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								list of RHC licenses
							</a>{" "}
							for more information.The Ravenhood Money spending account is
							offered through Ravenhood Money, LLC (“RHY”) (NMLS ID: 1990968), a
							licensed money transmitter. Review a{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								list of our licenses
							</a>{" "}
							for more information. Credit card products are offered by
							Ravenhood Credit, Inc. (&quot;RCT&quot;) (NMLS ID: 1781911) and
							issued by Coastal Community Bank, Member FDIC, pursuant to a
							license from Visa U.S.A. Inc. Ravenhood Platinum is offered through
							Ravenhood Platinum, LLC (“RHG”) and is a subscription offering premium
							services available for a fee.
						</p>
						<p>
							The Ravenhood Cash Card is a prepaid card issued by Sutton Bank,
							Member FDIC, pursuant to a license from Mastercard® International
							Incorporated. Mastercard and the circles design are registered
							trademarks of Mastercard International Incorporated.
						</p>
						<p>
							RHF, RHY, RHC, RCT, RHG, and RHS are affiliated entities and
							wholly owned subsidiaries of Ravenhood Markets, Inc. RHF, RHY,
							RHC, RCT, RHG, and RHS are not banks. Products offered by RHF are
							not FDIC insured and involve risk, including possible loss of
							principal. RHC isn&apos;t a member of FINRA and accounts are not
							FDIC insured or protected by SIPC.
						</p>
						<p>
							RHY is not a member of FINRA, and products are not subject to SIPC
							protection, but funds held in the Ravenhood spending account and
							Ravenhood Cash Card account may be eligible for FDIC pass-through
							insurance (review the{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								Ravenhood Cash Card Agreement
							</a>{" "}
							and the{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								Ravenhood Spending Account Agreement
							</a>
							).
						</p>
						<p>
							Options trading entails significant risk and is not appropriate
							for all customers. Customers must read and understand the
							Characteristics and Risks of Standardized Options before engaging
							in any options trading strategies. Options transactions are often
							complex and may involve the potential of losing the entire
							investment in a relatively short period of time. Certain complex
							options strategies carry additional risk, including the potential
							for losses that may exceed the original investment amount.
						</p>
						<p>
							Commission-free trading of stocks, ETFs and options refers to $0
							commissions for Ravenhood Financial self-directed individual cash
							or margin brokerage accounts that trade U.S. listed securities and
							certain OTC securities electronically. Keep in mind, other fees
							such as trading (non-commission) fees, Platinum subscription fees,
							wire transfer fees, and paper statement fees may apply to your
							brokerage account. Please see Ravenhood Financial&apos;s{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								Fee Schedule
							</a>{" "}
							to learn more.
						</p>
						<p>Ravenhood, 85 Willow Road, Menlo Park, CA 94025.</p>
						<p>© 2024 Ravenhood. All rights reserved.</p>
					</section>
				</div>
			</footer>
			<Outlet />
		</div>
	);
};

export default Footer;

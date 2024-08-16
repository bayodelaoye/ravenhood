import { Outlet } from "react-router-dom";
import Sparkles from "./Sparkle";
import "./Nu-HomePage.css";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../LoginFormModal";
import LimitationsModal from "../LimitationsModal";
import { FaCircleInfo } from "react-icons/fa6";
import Tilt from "react-parallax-tilt";
import Footer from "../../Footer";
import feather from "../../Navigation/Logo/ravenhoodLogoPurpleSilver.ico";

const NuHomePage = () => {
	return (
		<div id="home-page">
			<div id="section-1-nu-home">
				<div className="nu-headers">
					<h3 id="platinum-heading">
						Ravenhood Platinum <img src={feather} alt="ravenhood-logo" />
					</h3>
				</div>
				<div className="sparkle-container">
					<Sparkles>
						<div className="nu-headers">
							<Tilt>
								<h1 className="special-heading">Unlimited</h1>
								<h1 className="special-heading">Deposit</h1>
								<h1 className="special-heading">Boost</h1>
							</Tilt>
						</div>
					</Sparkles>
				</div>
				<div className="nu-headers">
					<h2>Put in a buck or a billion.</h2>
					<h2>Earn extra every time.</h2>
				</div>
				<div className="nu-text">
					<p>
						New eligible deposits get a 1% boost that can then start earning 5%
						APY or be invested in stocks and ETFs after you receive it.
					</p>
				</div>
				<div>
					<OpenModalButton
						buttonText={
							<span style={{ display: "flex", alignItems: "center" }}>
								<FaCircleInfo style={{ marginRight: "5px" }} />
								Terms and limitations
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
						modalComponent={<LimitationsModal />}
					/>
				</div>
				<div id="nu-deposit-button">
					<OpenModalButton
						buttonText="Deposit now"
						style={{
							background: `linear-gradient(270deg, #4D3F72 2.68%,#C8CBCD 104.69%,  #DFE0E5 61.25%)`,
							border: 0,
							width: `175px`,
							cursor: `pointer`,
							borderRadius: `40px`,
							padding: `12px 15px`,
							fontSize: `1em`,
							color: `black`,
						}}
						modalComponent={<LoginFormModal />}
					/>
				</div>
			</div>
			<div id="section-2-nu-home">
				<p>
					Get your first stock free.{" "}
					<a
						href="http://localhost:8000/support"
						target="_blank"
						rel="noreferrer"
						style={{
							color: `#C8CBCD`,
							fontWeight: `bold`,
							textDecoration: `underline`,
						}}
					>
						Limitations Apply.
					</a>{" "}
				</p>
			</div>
			<Footer />
			<Outlet />
		</div>
	);
};

export default NuHomePage;

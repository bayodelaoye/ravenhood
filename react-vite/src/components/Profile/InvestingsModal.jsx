import { useModal } from "../../context/Modal";
import { MdClose } from "react-icons/md";
import "./InvestingsModal.css";

const InvestingsModal = () => {
	const { closeModal } = useModal();

	const handleClick = async (event) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<div id="investings-modal">
			<div id="close-investings">
				<button id="close-investings-button" onClick={handleClick}>
					<MdClose />
				</button>
			</div>
			<div>
				<h3>Total individual value</h3>
				<p>
					The total value of your individual holdings, individual cash, and
					crypto holdings.
				</p>
			</div>
			<div>
				<h3>Individual holdings</h3>
				<p>
					The market value of your stocks, exchange-traded products (ETPs), and
					options positions.
				</p>
			</div>
			<div>
				<h3>Individual cash</h3>
				<p>
					The difference between your individual account value and the value of
					your securities. This includes Instant Deposits, unsettled funds, and
					cash held for orders, collateral, and transactions held as free credit
					balances in your individual account, or interest-bearing deposit
					accounts held at one or more banks.
				</p>
			</div>
			<div>
				<h3>Crypto holdings</h3>
				<p>The value of your crypto positions held at Ravenhood Crypto.</p>
			</div>
			<div>
				<h3>Further details</h3>
				<p>
					All investing involves risk, including the loss of principal.
					Individual Holdings include securities and related products offered by
					registered broker-dealer Ravenhood Financial LLC, member SIPC . Crypto
					Holdings are offered by Ravenhood Crypto, LLC, are not securities, and
					are not covered by SIPC. Ravenhood Crypto holdings are not offered by
					Ravenhood&apos;s broker-dealer and are therefore not subject to the
					same regulatory protections as those offered by Ravenhood Financial.
				</p>
                  </div>
                  <div id="dismiss-investings-button">
                        <button>Dismiss</button>
                  </div>
		</div>
	);
};

export default InvestingsModal;

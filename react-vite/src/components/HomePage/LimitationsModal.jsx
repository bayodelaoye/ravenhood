import { useModal } from "../../context/Modal";
import { MdClose } from "react-icons/md";
import "./LimitationsModal.css";

const LimitationsModal = () => {
	const { closeModal } = useModal();

	const handleClick = async (event) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<div id="limitations-modal">
			<div id="close-limitations">
				<button id="close-limitations-button" onClick={handleClick}>
					<MdClose />
				</button>
			</div>
			<div id="limitations-text">
				<h1>Terms and limitations</h1>
				<p>
					Deposit boost is divided into 24 monthly payouts. To earn your full
					boost, hold or invest your brokerage deposits for 2 years. If you
					cancel Platinum, you&apos;ll lose future payouts you haven&apos;t
					earned yet. Does not apply to IRAs. Boost only applies to eligible
					deposits, read the{" "}
					<a
						href="http://localhost:8000/"
						target="_blank"
						rel="noreferrer"
						style={{
							color: `#8A7C9C`,
							fontWeight: `bold`,
							textDecoration: `underline`,
						}}
					>
						terms and conditions
					</a>{" "}
					to learn more. Ravenhood Platinum is a subscription offering premium
					services available for a fee.
				</p>
			</div>
		</div>
	);
};

export default LimitationsModal;

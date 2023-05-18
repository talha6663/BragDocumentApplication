import React from "react";
import { GiStairsGoal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/Welcome.css";
import Navbar from "./Navbar";

const Welcome = () => {
	const { googleSignIn } = UserAuth();

	return (
		<>
			<Navbar />
			<div className="welcome_wrapper">
				<div>
					<h1>What is a bragdoc?</h1>
					<blockquote>
						<q>
							Your achievements may speak for themselves, but without a bragdoc, they risk being whispered instead of shouted from the rooftops. A well-crafted bragdoc ensures that your hard work and successes are not just remembered, but celebrated
							and shared to propel your career forward.
						</q>
						<figcaption>
							<cite>&mdash; ChatGPT</cite>
						</figcaption>
					</blockquote>
					<p className="goalIcon">
						<GiStairsGoal />
					</p>
					<div className="text_centered">
						<Link onClick={googleSignIn} className="start_message">
							Start your bragdoc today!
						</Link>
					</div>
				</div>
				<div>
					<h1>What goes in a bragdoc ...</h1>
					<ul>
						<li>
							<strong>List of accomplishments</strong> - Start by making a comprehensive list of your accomplishments, big and small, throughout your career. These can include awards, promotions, successful projects, positive feedback from clients or
							colleagues, and anything else that you're proud of.
						</li>
						<li>
							<strong>Metrics and data</strong> - Where possible, include metrics or data that demonstrate the impact of your accomplishments. For example, if you increased sales by a certain percentage, or reduced expenses by a certain amount, make
							sure to include those numbers.
						</li>
						<li>
							<strong>Specific examples</strong> - Along with the metrics, include specific examples of your work. Describe the challenges you faced, the actions you took, and the results you achieved.
						</li>
						<li>
							<strong>Skills and strengths</strong> - Highlight your skills and strengths, and provide examples of how you've used them to benefit your employer or clients. This can include soft skills like communication and teamwork, as well as
							technical skills specific to your industry or job function.
						</li>
						<li>
							<strong>Professional development</strong> - Include any training, certifications, or other professional development activities you've completed. This shows that you're committed to growing and improving in your career.
						</li>
						<li>
							<strong>Testimonials</strong> - If you have positive feedback or testimonials from colleagues, clients, or supervisors, include them in your bragdoc. This adds credibility and reinforces your achievements.
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Welcome;

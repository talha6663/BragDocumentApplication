import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
// import "../styles/Welcome.css";
import Navbar from "./Navbar";

const Welcome = () => {
	const { googleSignIn } = UserAuth();

	return (
		<>
			<div className="welcome-bg-image" alt="thinking">
				<Navbar />
				<div className="sm:flex sm:justtify-content-center mx-3 md:mx-4 lg:mx-28 text-neutral-700">
					<div className="sm:w-1/2 sm:mr-12 mt-20">
						<h1 className="mb-4 pl-3 text-center sm:text-left font-bold text-3xl sm:text-5xl text-slate-600">What is a bragdoc?</h1>
						<ul className="bg-white bg-opacity-60 sm:bg-opacity-40 drop-shadow-xl p-6 rounded-lg border-[1px] border-neutral-300">
							<li className="py-2">
								<strong>List of accomplishments</strong> - Start by making a comprehensive list of your accomplishments, big and small, throughout your career. These can include awards, promotions, successful projects, positive feedback from clients
								or colleagues, and anything else that you're proud of.
							</li>
							<li className="py-2">
								<strong>Metrics and data</strong> - Where possible, include metrics or data that demonstrate the impact of your accomplishments. For example, if you increased sales by a certain percentage, or reduced expenses by a certain amount,
								make sure to include those numbers.
							</li>
							<li className="py-2">
								<strong>Specific examples</strong> - Along with the metrics, include specific examples of your work. Describe the challenges you faced, the actions you took, and the results you achieved.
							</li>
							<li className="py-2">
								<strong>Skills and strengths</strong> - Highlight your skills and strengths, and provide examples of how you've used them to benefit your employer or clients. This can include soft skills like communication and teamwork, as well as
								technical skills specific to your industry or job function.
							</li>
							<li className="py-2">
								<strong>Professional development</strong> - Include any training, certifications, or other professional development activities you've completed. This shows that you're committed to growing and improving in your career.
							</li>
							<li className="py-2">
								<strong>Testimonials</strong> - If you have positive feedback or testimonials from colleagues, clients, or supervisors, include them in your bragdoc. This adds credibility and reinforces your achievements.
							</li>
						</ul>
					</div>
					<div className="sm:w-1/2 sm:ml-10 sm:mt-20">
						<blockquote className="my-5 bg-white bg-opacity-60 sm:bg-opacity-50 drop-shadow-xl p-6 rounded-lg border-[1px] border-neutral-300">
							<q className="font-semibold text-xl">
								Your achievements may speak for themselves, but without a bragdoc, they risk being whispered instead of shouted from the rooftops. A well-crafted bragdoc ensures that your hard work and successes are not just remembered, but
								celebrated and shared to propel your career forward.
							</q>
							<figcaption className="ml-4">
								<cite>&mdash; ChatGPT</cite>
							</figcaption>
						</blockquote>
						<div className="text-center sm:text-right pt-5 sm:pt-10 mb-3 sm:mb-0 sm:pr-8 border-3 border-white">
							<Link onClick={googleSignIn} className="p-4 rounded-full border-2 bg-white text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white text-xl font-bold">
								Start your Bragbox today!
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Welcome;

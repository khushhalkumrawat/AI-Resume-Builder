import {
	Mail,
	Phone,
	MapPin,
	Globe,
} from "lucide-react";

import React from "react";


const ModernTemplate = ({ data, accentColor, sectionOrder = [] }) => {

	const formatDate = (dateStr) => {
		if (!dateStr) return "";

		const [year, month] = dateStr.split("-");

		return new Date(year, month - 1).toLocaleDateString(
			"en-US",
			{
				year: "numeric",
				month: "short"
			}
		);
	};


	return (

		<div
			className="max-w-4xl mx-auto bg-white text-gray-800"
			style={{
				fontSize: `${data.font_size || 14}px`
			}}
		>


			{/* Header */}

			<header
				className="p-8 text-white"
				style={{
					backgroundColor: accentColor
				}}
			>

				<h1 className="text-4xl font-light mb-2">
					{
						data.personal_info?.full_name ||
						"Your Name"
					}
				</h1>


				{
					data.personal_info?.profession && (

						<p className="text-lg opacity-90 mb-5">

							{
								data.personal_info.profession
							}

						</p>

					)

				}



				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">


					{
						data.personal_info?.email && (

							<div className="flex items-center gap-2">

								<Mail className="size-4" />

								<span>
									{
										data.personal_info.email
									}
								</span>

							</div>

						)
					}



					{
						data.personal_info?.phone && (

							<div className="flex items-center gap-2">

								<Phone className="size-4" />

								<span>
									{
										data.personal_info.phone
									}
								</span>

							</div>

						)
					}



					{
						data.personal_info?.location && (

							<div className="flex items-center gap-2">

								<MapPin className="size-4" />

								<span>
									{
										data.personal_info.location
									}
								</span>

							</div>

						)
					}



					{
						data.personal_info?.portfolio && (

							<a
								href={data.personal_info.portfolio}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2"
							>

								<Globe className="size-4" />

								<span className="break-all text-xs">

									{
										data.personal_info.portfolio
											.replace(
												/^https?:\/\//,
												""
											)
									}

								</span>

							</a>

						)
					}



					{
						data.personal_info?.linkedin && (

							<a
								href={data.personal_info.linkedin}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2"
							>

								<Linkedin className="size-4" />

								<span className="text-xs">
									LinkedIn
								</span>

							</a>

						)
					}



					{
						data.personal_info?.github && (

							<a
								href={data.personal_info.github}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2"
							>

								<Github className="size-4" />

								<span className="text-xs">
									GitHub
								</span>

							</a>

						)
					}


				</div>


			</header>



			<div className="p-8"></div>
			{/* Professional Summary */}

			{
				data.professional_summary && (

					<section className="mb-8">

						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Professional Summary
						</h2>


						<p className="text-gray-700 leading-relaxed">
							{
								data.professional_summary
							}
						</p>


					</section>

				)
			}





			{/* Experience */}

			{
				data.experience &&
				data.experience.length > 0 && (

					<section className="mb-8">


						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
							Experience
						</h2>



						<div className="space-y-6">


							{
								data.experience.map((exp, index) => (

									<div
										key={index}
										className="relative pl-6 border-l border-gray-200"
									>


										<div className="flex justify-between items-start mb-2">


											<div>


												<h3 className="text-xl font-medium text-gray-900">

													{
														exp.position
													}

												</h3>



												<p
													className="font-medium"
													style={{
														color: accentColor
													}}
												>

													{
														exp.company
													}

												</p>



												<div className="flex gap-2 text-sm text-gray-500 mt-1 flex-wrap">


													{
														exp.location && (

															<span>
																{
																	exp.location
																}
															</span>

														)
													}



													{
														exp.employment_type && (

															<>

																<span>
																	•
																</span>


																<span>
																	{
																		exp.employment_type
																	}
																</span>

															</>

														)
													}



												</div>


											</div>





											<div
												className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded whitespace-nowrap"
											>


												{
													formatDate(
														exp.start_date
													)
												}


												{" - "}



												{
													exp.is_current
														? "Present"
														: formatDate(
															exp.end_date
														)
												}


											</div>


										</div>





										{
											exp.description && (

												<div
													className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line"
												>

													{
														exp.description
													}

												</div>

											)
										}



									</div>


								))
							}



						</div>



					</section>

				)
			}
			{/* Projects */}

			{
				data.project &&
				data.project.length > 0 && (

					<section className="mb-8">


						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Projects
						</h2>




						<div className="space-y-6">


							{
								data.project.map((p, index) => (

									<div
										key={index}
										className="relative pl-6 border-l border-gray-200"
										style={{
											borderLeftColor: accentColor
										}}
									>


										<div>


											<h3 className="text-lg font-medium text-gray-900">
												{
													p.name
												}
											</h3>



											{
												p.type && (

													<p
														className="text-sm font-medium mt-1"
														style={{
															color: accentColor
														}}
													>

														{
															p.type
														}

													</p>

												)
											}



											{
												p.tech_stack && (

													<p className="text-sm text-gray-500 mt-1">

														{
															p.tech_stack
														}

													</p>

												)
											}




											<div className="flex gap-4 mt-2 text-sm">


												{
													p.github && (

														<a
															href={p.github}
															target="_blank"
															rel="noreferrer"
															style={{
																color: accentColor
															}}
														>

															GitHub

														</a>

													)
												}




												{
													p.live_demo && (

														<a
															href={p.live_demo}
															target="_blank"
															rel="noreferrer"
															style={{
																color: accentColor
															}}
														>

															Live Demo

														</a>

													)
												}



											</div>



										</div>





										{
											p.description && (

												<div
													className="text-gray-700 leading-relaxed text-sm mt-3 whitespace-pre-line"
												>

													{
														p.description
													}

												</div>

											)
										}



									</div>


								))
							}


						</div>



					</section>

				)
			}






			<div className="grid sm:grid-cols-2 gap-8">



				{/* Education */}


				{
					data.education &&
					data.education.length > 0 && (


						<section>


							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Education
							</h2>




							<div className="space-y-4">


								{
									data.education.map((edu, index) => (

										<div key={index}>


											<h3 className="font-semibold text-gray-900">

												{
													edu.degree
												}

												{" "}

												{
													edu.field &&
													`in ${edu.field}`
												}

											</h3>




											<p
												style={{
													color: accentColor
												}}
											>

												{
													edu.institution
												}

											</p>




											<div className="flex justify-between items-center text-sm text-gray-600">


												<span>

													{
														formatDate(
															edu.graduation_date
														)
													}

												</span>



												{
													edu.gpa && (

														<span>

															GPA: {edu.gpa}

														</span>

													)
												}



											</div>



										</div>


									))
								}



							</div>


						</section>


					)
				}
				{/* Skills */}

				{
					data.skills &&
					Array.isArray(data.skills) &&
					data.skills.length > 0 && (

						<section>


							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Skills
							</h2>




							<div className="flex flex-wrap gap-2">


								{
									data.skills.map((skill, index) => (

										<span
											key={index}
											className="px-3 py-1 text-sm text-white rounded-full"
											style={{
												backgroundColor: accentColor
											}}
										>

											{
												typeof skill === "string"
													? skill
													: skill.name
											}

										</span>

									))
								}



							</div>


						</section>

					)
				}



			</div>






			{/* Achievements */}


			{
				data.achievements &&
				data.achievements.length > 0 && (


					<section className="mb-8 mt-8">


						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Achievements
						</h2>



						<ul className="list-disc pl-5 space-y-2">


							{
								data.achievements.map((item, index) => (

									<li
										key={index}
										className="text-gray-700"
									>

										{
											item
										}

									</li>

								))
							}


						</ul>


					</section>


				)
			}







			{/* Certifications */}


			{
				data.certifications &&
				data.certifications.length > 0 && (


					<section className="mb-8">


						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Certifications
						</h2>



						<div className="space-y-5">


							{
								data.certifications.map((cert, index) => (


									<div key={index}>


										<h3 className="font-semibold text-gray-900">

											{
												cert.name
											}

										</h3>




										{
											cert.issuer && (

												<p
													style={{
														color: accentColor
													}}
												>

													{
														cert.issuer
													}

												</p>

											)
										}





										{
											cert.issue_date && (

												<p className="text-sm text-gray-500">

													{
														formatDate(
															cert.issue_date
														)
													}

												</p>

											)
										}






										{
											cert.credential_id && (

												<p className="text-sm text-gray-600">

													Credential ID:
													{" "}
													{
														cert.credential_id
													}

												</p>

											)
										}





										{
											cert.credential_url && (

												<a
													href={cert.credential_url}
													target="_blank"
													rel="noreferrer"
													className="text-sm"
													style={{
														color: accentColor
													}}
												>

													Verify Credential

												</a>

											)
										}




									</div>


								))
							}



						</div>



					</section>


				)
			}
		
		</div>

	);

};


export default ModernTemplate;
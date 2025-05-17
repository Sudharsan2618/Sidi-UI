import React from "react";
import { Fade, Slide } from 'react-awesome-reveal';
import CountUp from 'react-countup';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Fade triggerOnce>
                    <h1 className="text-4xl font-bold text-primary-600 mb-8">About Us</h1>
                </Fade>

                <Fade direction="up" triggerOnce>
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Mission</h2>
                        <p className="text-gray-700 mb-6">
                            We are dedicated to providing comprehensive economic and market insights through
                            interactive visualizations and data-driven analysis. Our platform empowers
                            decision-makers with real-time information about global markets, economic
                            indicators, and investment opportunities.
                        </p>
                    </div>
                </Fade>

                <Slide direction="left" triggerOnce>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-primary-700 mb-3">Data Visualization</h3>
                            <p className="text-gray-700">
                                Our interactive maps and dashboards transform complex data into clear,
                                actionable insights. We help you understand global economic trends at a glance.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-primary-700 mb-3">Market Analysis</h3>
                            <p className="text-gray-700">
                                Stay ahead with our comprehensive market analysis tools. Track market movements,
                                identify opportunities, and make informed decisions.
                            </p>
                        </div>
                    </div>
                </Slide>

                <Fade direction="up" triggerOnce>
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold text-primary-700 mb-4">How You Benefit</h2>
                        <p className="text-gray-700 mb-6">
                            As a user of SIDI, you gain access to a wealth of information and tools designed to help you make informed decisions in the world of international foreign direct investment. Our platform provides:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Comprehensive data on global FDI trends and opportunities.</li>
                            <li>Interactive visualizations to explore data and identify patterns.</li>
                            <li>Real-time market insights and economic indicators.</li>
                            <li>Tools to track potential investment opportunities.</li>
                            <li>Data-driven analysis to support your investment strategy.</li>
                        </ul>
                    </div>
                </Fade>

                <Fade direction="up" triggerOnce>
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold text-primary-700 mb-4">Key FDI Data</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="text-3xl font-bold text-primary-600">
                                    <CountUp end={1.5} decimals={1} suffix=" Trillion+" enableScrollSpy={true} />
                                </h3>
                                <p className="text-gray-700">Global FDI Flows (Annual Average)</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary-600">
                                    <CountUp end={100} suffix="+" enableScrollSpy={true} />
                                </h3>
                                <p className="text-gray-700">Covered in Our Database</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary-600">
                                     <CountUp end={10000} suffix="+" enableScrollSpy={true} />
                                </h3>
                                <p className="text-gray-700">of Data Points Analyzed Daily</p>
                            </div>
                        </div>
                    </div>
                </Fade>

                <Fade direction="up" triggerOnce>
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Values</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="h-6 w-6 text-primary-600 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Accuracy</h4>
                                    <p className="text-gray-700">We prioritize data accuracy and reliability in all our analyses.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="h-6 w-6 text-primary-600 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                                    <p className="text-gray-700">We continuously improve our tools and methodologies.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="h-6 w-6 text-primary-600 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Transparency</h4>
                                    <p className="text-gray-700">We believe in clear, honest communication and data presentation.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default About; 
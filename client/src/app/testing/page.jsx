"use client";
import React from 'react';

const Polygon = () => {

  return (
    <div>
        <div className='stage'>
            <svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="536" height="218" viewBox="0 0 1000 350" fill="none">
                <g filter="url(#filter0_d_1264_4714)">
                    <path d="M531.829 85.9817L396.797 150.513L272.883 115.045L206.677 152.306L265.503 170.543L182.886 209.375L4.2442 152.305L83.5193 115.045L96.6564 118.681L171.246 81.7474L114.583 64.8079L252.847 0.368538L531.829 85.9817Z" fill="white"/>
                    <path d="M206.529 152.784L264.123 170.638L182.851 208.839L5.60886 152.216L83.5644 115.576L96.523 119.162L96.7071 119.213L96.8783 119.129L171.468 82.1954L172.606 81.632L171.389 81.2683L115.986 64.7055L252.884 0.902913L530.456 86.0835L396.752 149.98L273.02 114.564L272.82 114.507L272.638 114.609L206.432 151.871L205.42 152.44L206.529 152.784Z" stroke="black"/>
                </g>
                <defs>
                    <filter id="filter0_d_1264_4714" x="0.246094" y="0.367188" width="535.582" height="217.008" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1264_4714"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1264_4714" result="shape"/>
                    </filter>
                </defs>
                </svg>
            </svg>
        </div>

        <svg className="zone" style={{top:"10%",left:"25%"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
        <path d="M47.8867 0L184 41.4435L136.169 64L0 22.6866L47.8867 0Z" fill="#EF61E1"/>
        </svg>
        <svg className="zone" style={{top:"13%",left:"19%"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
        <path d="M47.8867 0L184 41.4435L136.169 64L0 22.6866L47.8867 0Z" fill="#EF61E1"/>
        </svg>
        <svg className="zone" style={{top:"16%",left:"13%"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
        <path d="M47.8867 0L184 41.4435L136.169 64L0 22.6866L47.8867 0Z" fill="#EF61E1"/>
        </svg>


        <svg className="zone" style={{top:"30%",left:"1%"}} xmlns="http://www.w3.org/2000/svg" width="298" height="135" viewBox="0 0 298 135" fill="none">
        <path d="M179.356 0L271.334 26.7873L218.322 51.5711L298 75.786L173.231 135L0 84.542L179.356 0Z" fill="#EFD061"/>
        </svg>

        <svg className="zone" style={{top:"31.5%",left:"25%"}} xmlns="http://www.w3.org/2000/svg" width="140" height="56" viewBox="0 0 140 56" fill="none">
        <path d="M74.1616 0L140 20.2327L65.9373 56L0 35.7673L74.1616 0Z" fill="#65F74D"/>
        </svg>
        <svg className="zone" style={{top:"31.5%",left:"25%"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
        <path d="M74.245 0L107 10.1093L32.9854 45L0 34.9294L74.245 0Z" fill="#61E6EF"/>
        </svg>
        <svg className="zone" style={{top:"29.5%",left:"27%"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
        <path d="M74.245 0L107 10.1093L32.9854 45L0 34.9294L74.245 0Z" fill="#61E6EF"/>
        </svg>
                

        <style jsx>{`
            .stage {
                position: relative;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                padding: 2%;
                display: flex;
                height: 5%;
                width: 34%;
                left: 33%;
                margin-top: 1%;
            }
            .seating-plan {
                position: relative;
                margin: 20px;
                padding: 20px;
            }
            .row {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            .zone {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 12px;
            }
            .selected {
                background-color: green !important;
            }
            @media (max-width: 768px) {
                .seating-plan {
                    margin: 5px;
                    padding: 5px;
                }

                .zone {
                    font-size: 6px;
                }
            }
            @media (min-width: 768px) {
                .seating-plan {
                    margin: 10px;
                    padding: 10px;
                }

                .zone {
                    font-size: 12px;
                }
            }
        `}</style>


            
    </div>
  );
};

export default Polygon;

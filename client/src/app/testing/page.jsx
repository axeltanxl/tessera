"use client";
import React from 'react';

const Polygon = ({setSelectedZone,selectedZone,setSelectedCat,selectedCat,setSelectedPrice,selectedPrice}) => {
    
    const map = [
        {category:"A", zones:[
            {zoneId: "1", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E", position:"absolute", display:"flex", alignItems: "center", justifyContent: "center" }},
            {zoneId: "2", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E", position:"absolute", display:"flex", alignItems: "center", justifyContent: "center" }},
            {zoneId: "3", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E", position:"absolute", display:"flex", alignItems: "center", justifyContent: "center" }},
            {zoneId: "4", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E", position:"absolute", display:"flex", alignItems: "center", justifyContent: "center" }},
            {zoneId: "5", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E", position:"absolute", display:"flex", alignItems: "center", justifyContent: "center" }},
        ]}
    ]

    const selectZone = (zoneId) => {
        setSelectedZone(zoneId);
    };

    const selectPrice = (price) => {
      setSelectedPrice(price);
    }

    const selectCat = (cat) => {
      setSelectedCat(cat);
    }

    return (
        <div>
            <h1 className="text-center">Seating Plan</h1><br/>
            <div style = {{position:"absolute", zIndex:1 ,top:"26%",left:"59%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}}>STAGE</div>

            <div className="seating-plan">
                {seatingPlan.map((cat, catIndex) => (
                    <div key={catIndex}>
                        <div className="row">
                            {cat.zones.map((zone, zoneIndex) => (
                                <div
                                    key={zoneIndex} className={`zone ${selectedZone === zone.zoneId ? "selected" : ""}`}
                                    style={zone.style} onClick={ () => {selectZone(zone.zoneId);selectCat(cat.category);selectPrice(cat.price);} }>
                                      {zone.zoneId}
                                </div>
                                
                            ))}
                        </div>
                    </div>
                ))}

            </div>
            
    {/* purple */}
            <svg style={{top:"16%",left:"42.6%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
            <svg style={{top:"19%",left:"39.3%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
            <svg style={{top:"22%",left:"36%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
    {/* purple */}
            <svg style={{top:"32%",left:"70%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
            <svg style={{top:"35%",left:"66.7%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
            <svg style={{top:"38%",left:"63.4%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
            <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" stroke-width="3"/>
            </svg>
    {/* yellow box 1*/}
            <svg style={{top:"30%",left:"23%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="298" height="135" viewBox="0 0 298 135" fill="none">
            <path d="M173.103 133.4L4.22299 84.2097L179.482 1.59897L267.093 27.1144L217.686 50.2123L214.143 51.8689L217.886 53.0063L293.853 76.0936L173.103 133.4Z" fill="#FBFE7D" stroke="black" stroke-width="3"/>
            </svg>
    {/* yellow box 1*/}
            <svg style={{top:"42.5%",left:"44%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="357" height="127" viewBox="0 0 357 127" fill="none">
            <path d="M190.956 31.2671L191.515 31.4374L192.042 31.1838L253.532 1.60515L353.215 31.8808L187.97 125.383L4.15443 72.1106L127.473 11.9517L190.956 31.2671Z" fill="#FBFE7D" stroke="black" stroke-width="3"/>
            </svg>
    {/* green box*/}
            <svg style={{top:"31.9%",left:"39%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="140" height="56" viewBox="0 0 140 56" fill="none">
            <path d="M4.09862 35.4559L74.2833 1.60664L135.906 20.5439L65.8148 54.3934L4.09862 35.4559Z" fill="#A9FB9C" stroke="black" stroke-width="3"/>
            </svg>
    {/* green box*/}
            <svg style={{top:"38.5%",left:"52%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="140" height="56" viewBox="0 0 140 56" fill="none">
            <path d="M4.09862 35.4559L74.2833 1.60664L135.906 20.5439L65.8148 54.3934L4.09862 35.4559Z" fill="#A9FB9C" stroke="black" stroke-width="3"/>
            </svg>
    {/* green long*/}
            <svg style={{top:"39.5%",left:"35%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="176" height="74" viewBox="0 0 176 74" fill="none">
            <path d="M4.15945 57.1407L122.235 1.60458L171.861 16.9167L54.1406 72.3963L4.15945 57.1407Z" fill="#A9FB9C" stroke="black" stroke-width="3"/>
            </svg>
    {/* green long*/}
            <svg style={{top:"41.8%",left:"39.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="176" height="74" viewBox="0 0 176 74" fill="none">
            <path d="M4.15945 57.1407L122.235 1.60458L171.861 16.9167L54.1406 72.3963L4.15945 57.1407Z" fill="#A9FB9C" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"26.5%",left:"44.9%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"21.5%",left:"50.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"34.5%",left:"59.9%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"29.5%",left:"65.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"35%",left:"44.9%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/* blue */}
            <svg style={{top:"36.5%",left:"48%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
            <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" stroke-width="3"/>
            </svg>
    {/*stage*/}
            <div style = {{top:"23%",left:"49.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="301" height="121" viewBox="0 0 301 121" fill="none">
            <g filter="url(#filter0_d_1265_4744)">
                <path d="M141.816 0L296.5 44.543L219 80.043L157 62.543L117 81.043L149 91.043L103 112.043L4 82.543L49.5 61.043L55 62.543L95 44.043L64.5 35.043L141.816 0Z" fill="white"/>
                <path d="M95.4245 42.6043L68.7907 34.7451L141.932 1.59434L292.196 44.8646L218.877 78.4496L157.407 61.0994L156.874 60.9487L156.37 61.1815L116.37 79.6815L112.84 81.3144L116.553 82.4747L144.812 91.3058L102.889 110.445L8.18453 82.2247L49.6399 62.6359L54.6053 63.9901L55.1331 64.1341L55.6297 63.9044L95.6297 45.4044L99.2459 43.7319L95.4245 42.6043Z" stroke="black" stroke-width="3"/>
            </g>
            <defs>
                <filter id="filter0_d_1265_4744" x="0" y="0" width="300.5" height="120.043" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1265_4744"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1265_4744" result="shape"/>
                </filter>
            </defs>
            </svg>
            </div>

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

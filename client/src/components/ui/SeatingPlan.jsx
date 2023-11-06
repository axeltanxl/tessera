import React from "react";



const SeatingPlan = ({setSelectedZone,selectedZone,setSelectedCat,selectedCat,setSelectedPrice,selectedPrice,table}) => {

    var jsonString = table.replace(/'/g, '"');
// Parse the JSON string into a JavaScript object
    var jsonObject = JSON.parse(jsonString);

    const seatingPlan = [

        { category: "A", zones: [
            {zoneId: "1", style: { top:"37.6%",left:"53%" }},
            {zoneId: "2", style: { top:"40.7%",left:"47.5%" }},
            {zoneId: "3", style: { top:"43.6%",left:"69%" }},
            {zoneId: "4", style: { top:"46.7%",left:"63.7%" }},
            {zoneId: "5", style: { top:"46.4%",left:"47.5%" }},
            {zoneId: "6", style: { top:"47.5%",left:"50.5%" }},
        ] },
        { category: "B", zones: [
            {zoneId: "7", style: { top:"43.4%",left:"42.5%" }},
            {zoneId: "8", style: { top:"49.5%",left:"58.5%" }},
            {zoneId: "9", style: { top:"49.5%",left:"42%" }},
            {zoneId: "10", style: { top:"52%",left:"46%" }},
        ] },
        { category: "C", zones: [
            {zoneId: "11", style: { top:"34.5%",left:"47%" }},
            {zoneId: "12", style: { top:"36.5%",left:"43%" }},
            {zoneId: "13", style: { top:"38.5%",left:"39%" }},
            {zoneId: "14", style: { top:"45.3%",left:"76%" }},
            {zoneId: "15", style: { top:"47.3%",left:"73%" }},
            {zoneId: "16", style: { top:"49.3%",left:"70%" }},
        ] },
        { category: "D", zones: [
            {zoneId: "17", style: { top:"45.5%",left:"33%" }},
            {zoneId: "18", style: { top:"55.5%",left:"57%" }},
        ] },
    ];

    const selectZone = (zoneId) => {
        setSelectedZone(zoneId);
    };

    const selectPrice = (cat) => {
        const char = cat.toString();
        switch(char){
            case "A":
                setSelectedPrice(parseInt(jsonObject["A"]));
                break;
            case "B":
                setSelectedPrice(parseInt(jsonObject["B"]));
                break;
            case "C":
                setSelectedPrice(parseInt(jsonObject["C"]));
                break;
            case "D":
                setSelectedPrice(parseInt(jsonObject["D"]));
                break;
            default:
                setSelectedPrice(0);
        }
    }

    const selectCat = (cat) => {
      setSelectedCat(cat);
    }

    return (
        <div>
            <div style={{textAlign:"center", fontSize:"20px"}}>Seat Selection</div>
            <div >
            <div >

        {/* purple */}
                <svg style={{top:"33%",left:"41.6%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>
                <svg style={{top:"35%",left:"38.3%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>
                <svg style={{top:"37%",left:"35%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7456L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>

                <svg style={{top:"43.5%",left:"70.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7457L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>
                <svg style={{top:"45.5%",left:"67.2%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7457L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>
                <svg style={{top:"47.5%",left:"63.9%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="184" height="64" viewBox="0 0 184 64" fill="none">
                <path d="M4.15276 22.379L48.0047 1.60392L179.843 41.7457L136.051 62.3969L4.15276 22.379Z" fill="#FFA1F6" stroke="black" strokeWidth="3"/>
                </svg>

        {/* yellow 1*/}
                <svg style={{top:"41%",left:"22%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="298" height="135" viewBox="0 0 298 135" fill="none">
                <path d="M173.103 133.4L4.22299 84.2097L179.482 1.59897L267.093 27.1144L217.686 50.2123L214.143 51.8689L217.886 53.0063L293.853 76.0936L173.103 133.4Z" fill="#FBFE7D" stroke="black" strokeWidth="3"/>
                </svg>
        {/* yellow 2*/}
                <svg style={{top:"51%",left:"46%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="357" height="127" viewBox="0 0 357 127" fill="none">
                <path d="M190.956 31.2671L191.515 31.4374L192.042 31.1838L253.532 1.60515L353.215 31.8808L187.97 125.383L4.15443 72.1106L127.473 11.9517L190.956 31.2671Z" fill="#FBFE7D" stroke="black" strokeWidth="3"/>
                </svg>

        {/* green 1*/}
                <svg style={{top:"42%",left:"38%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="140" height="56" viewBox="0 0 140 56" fill="none">
                <path d="M4.09862 35.4559L74.2833 1.60664L135.906 20.5439L65.8148 54.3934L4.09862 35.4559Z" fill="#A9FB9C" stroke="black" strokeWidth="3"/>
                </svg>
        {/* green 2*/}
                <svg style={{top:"48%",left:"54.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="140" height="56" viewBox="0 0 140 56" fill="none">
                <path d="M4.09862 35.4559L74.2833 1.60664L135.906 20.5439L65.8148 54.3934L4.09862 35.4559Z" fill="#A9FB9C" stroke="black" strokeWidth="3"/>
                </svg>
        {/* green 3*/}
                <svg style={{top:"48%",left:"35.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="176" height="74" viewBox="0 0 176 74" fill="none">
                <path d="M4.15945 57.1407L122.235 1.60458L171.861 16.9167L54.1406 72.3963L4.15945 57.1407Z" fill="#A9FB9C" stroke="black" strokeWidth="3"/>
                </svg>
        {/* green 4*/}
                <svg style={{top:"50%",left:"40.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="176" height="74" viewBox="0 0 176 74" fill="none">
                <path d="M4.15945 57.1407L122.235 1.60458L171.861 16.9167L54.1406 72.3963L4.15945 57.1407Z" fill="#A9FB9C" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 1*/}
                <svg style={{top:"39.5%",left:"44.5%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 2*/}
                <svg style={{top:"36.5%",left:"49.7%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 3*/}
                <svg style={{top:"45.5%",left:"60.8%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 4*/}
                <svg style={{top:"42.5%",left:"66%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 5*/}
                <svg style={{top:"45%",left:"45%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>
        {/* blue 6*/}
                <svg style={{top:"46%",left:"48%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}} xmlns="http://www.w3.org/2000/svg" width="107" height="45" viewBox="0 0 107 45" fill="none">
                <path d="M4.15854 34.6306L74.3578 1.60464L102.862 10.4018L32.8696 43.3963L4.15854 34.6306Z" fill="#C2FBFF" stroke="black" strokeWidth="3"/>
                </svg>


        {/*stage*/}
                <div style = {{top:"38%",left:"49%",position:"absolute", display:"flex", alignItems: "center", justifyContent: "center"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="301" height="121" viewBox="0 0 301 121" fill="none">
                <g filter="url(#filter0_d_1265_4744)">
                    <path d="M141.816 0L296.5 44.543L219 80.043L157 62.543L117 81.043L149 91.043L103 112.043L4 82.543L49.5 61.043L55 62.543L95 44.043L64.5 35.043L141.816 0Z" fill="white"/>
                    <path d="M95.4245 42.6043L68.7907 34.7451L141.932 1.59434L292.196 44.8646L218.877 78.4496L157.407 61.0994L156.874 60.9487L156.37 61.1815L116.37 79.6815L112.84 81.3144L116.553 82.4747L144.812 91.3058L102.889 110.445L8.18453 82.2247L49.6399 62.6359L54.6053 63.9901L55.1331 64.1341L55.6297 63.9044L95.6297 45.4044L99.2459 43.7319L95.4245 42.6043Z" stroke="black" strokeWidth="3"/>
                </g>
                <defs>
                    <filter id="filter0_d_1265_4744" x="0" y="0" width="300.5" height="120.043" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
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
            </div>
            </div>

            <div>
            {seatingPlan.map((cat, catIndex) => (
                    <div key={catIndex}>
                        <div>
                            {cat.zones.map((zone, zoneIndex) => (
                                <div
                                    key={zoneIndex} className={`zone ${selectedZone === zone.zoneId ? "selected" : ""}`}
                                    style={zone.style} onClick={ () => {selectZone(zone.zoneId); selectCat(cat.category); selectPrice(cat.category);} }>
                                      {zone.zoneId}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
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
                    border: 1px solid #b2b2b2;
                    height: 16px;
                    width:16px;
                    font-size: 14px;
                    border-radius: 50%;
                }
                .selected {
                    background-color: gold !important;
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
                .container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }

                .pic{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%; /* This allows the SVG to scale with the container */
                height: 100%;
                }
            `}</style>
            

        </div>

    )
}

export default SeatingPlan;
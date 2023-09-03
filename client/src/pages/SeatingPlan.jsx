import { useState } from "react";

export default function SeatingPlan () {
    const [selectedZone, setSelectedZone] = useState();

    const seatingPlan = [
        // { category: "CAT 1", zones: ["PA1", "PA2", "PB1", "PB2", "PB3", "PB4",
        //                             "PC1", "PC2", "PC3", "PC4", "PD1", "PD2", "PD3", "PD4",
        //                             "PE2", "PE3", "PF1", "PF2", "PF3", "PF4", "PF5", "PF6", "PF7",
        //                             "112", "113", "114", "115", "116", "117",
        //                             "134", "135", "136", "137", "138", "139"] },
        { category: "CAT 1", zones: [
            {zoneId: "PA1", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PA2", style: { top:"100%",right:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PB1", style: { top:"100%",left:"22%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PB2", style: { top:"100%",left:"34%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PB3", style: { top:"100%",right:"34%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PB4", style: { top:"100%",right:"22%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PC1", style: { top:"100%",left:"22%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PC2", style: { top:"100%",left:"34%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PC3", style: { top:"100%",right:"34%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PC4", style: { top:"100%",right:"22%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PD1", style: { top:"100%",left:"24%",height:"70%",width:"12%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PD2", style: { top:"100%",left:"36%",height:"70%",width:"8%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PD3", style: { top:"100%",right:"36%",height:"70%",width:"8%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PD4", style: { top:"100%",right:"24%",height:"70%",width:"12%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PE1", style: { top:"100%",left:"34%",height:"70%",width:"10%",marginTop:"16%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PE2", style: { top:"100%",right:"34%",height:"70%",width:"10%",marginTop:"16%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PF1", style: { top:"100%",left:"34%",height:"100%",width:"14%",marginTop:"20%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PF2", style: { top:"100%",right:"34%",height:"100%",width:"14%",marginTop:"20%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PG1", style: { top:"100%",left:"30%",height:"100%",width:"12%",marginTop:"25%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PG2", style: { top:"100%",left:"30%",height:"100%",width:"12%",marginTop:"30%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PG3", style: { top:"100%",left:"42%",height:"70%",width:"16%",marginTop:"32%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PG4", style: { top:"100%",right:"30%",height:"100%",width:"12%",marginTop:"25%",backgroundColor:"#FFDB0E" }},
            {zoneId: "PG5", style: { top:"100%",right:"30%",height:"100%",width:"12%",marginTop:"30%",backgroundColor:"#FFDB0E" }},
        ] },
        { category: "CAT 2", zones: [
            {zoneId: "PH1", style: { top:"100%",left:"25%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "PH2", style: { top:"100%",left:"35%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "PH3", style: { top:"100%",left:"45%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "PH4", style: { top:"100%",right:"35%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "PH5", style: { top:"100%",right:"25%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "101", style: { top:"100%",right:"25%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "101", style: { top:"100%",right:"17%",height:"100%",width:"18%",marginTop:"48%",backgroundColor:"#68CDFF" }},
            {zoneId: "151", style: { top:"100%",left:"25%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "151", style: { top:"100%",left:"17%",height:"100%",width:"18%",marginTop:"48%",backgroundColor:"#68CDFF" }},
            {zoneId: "100", style: { top:"100%",left:"40%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "150", style: { top:"100%",right:"40%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
        ] },
        { category: "CAT 3", zones: [
            {zoneId: "200", style: { top:"100%",left:"40%",height:"100%",width:"10%",marginTop:"48%",backgroundColor:"#FF6A68" }},
            {zoneId: "250", style: { top:"100%",right:"40%",height:"100%",width:"10%",marginTop:"48%",backgroundColor:"#FF6A68" }},
            {zoneId: "106", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"18%",backgroundColor:"#FF6A68" }},
            {zoneId: "107", style: { top:"100%",right:"15%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FF6A68" }},
            {zoneId: "108", style: { top:"100%",right:"15%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "109", style: { top:"100%",right:"15%",height:"100%",width:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "156", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"18%",backgroundColor:"#FF6A68" }},
            {zoneId: "157", style: { top:"100%",left:"15%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FF6A68" }},
            {zoneId: "158", style: { top:"100%",left:"15%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "159", style: { top:"100%",left:"15%",height:"100%",width:"6%",backgroundColor:"#FF6A68" }},
        ] },
        { category: "CAT 4", zones: [
            {zoneId: "152", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"42%",backgroundColor:"#68FFAC" }},
            {zoneId: "153", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"36%",backgroundColor:"#68FFAC" }},
            {zoneId: "154", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"30%",backgroundColor:"#68FFAC" }},
            {zoneId: "155", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"24%",backgroundColor:"#68FFAC" }},
            {zoneId: "102", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"42%",backgroundColor:"#68FFAC" }},
            {zoneId: "103", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"36%",backgroundColor:"#68FFAC" }},
            {zoneId: "104", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"30%",backgroundColor:"#68FFAC" }},
            {zoneId: "105", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"24%",backgroundColor:"#68FFAC" }},
        ] },
        { category: "CAT 5", zones: [
            {zoneId: "252", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"42%",backgroundColor:"#C168FF" }},
            {zoneId: "253", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"36%",backgroundColor:"#C168FF" }},
            {zoneId: "254", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"30%",backgroundColor:"#C168FF" }},
            {zoneId: "255", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"24%",backgroundColor:"#C168FF" }},
            {zoneId: "202", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"42%",backgroundColor:"#C168FF" }},
            {zoneId: "203", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"36%",backgroundColor:"#C168FF" }},
            {zoneId: "204", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"30%",backgroundColor:"#C168FF" }},
            {zoneId: "205", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"24%",backgroundColor:"#C168FF" }},
        ] },
        { category: "CAT 6", zones: [
            {zoneId: "206", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"18%",backgroundColor:"#FFAF68"}},
            {zoneId: "207", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FFAF68" }},
            {zoneId: "208", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "209", style: { top:"100%",right:"8%",height:"100%",width:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "256", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"18%",backgroundColor:"#FFAF68" }},
            {zoneId: "257", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FFAF68" }},
            {zoneId: "258", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "259", style: { top:"100%",left:"8%",height:"100%",width:"6%",backgroundColor:"#FFAF68" }},
        ] },


    ];

    const selectZone = (zoneId) => {
        setSelectedZone(zoneId);
    };

    return (
        <div>
            <h1 className="text-center">Seating Plan</h1><br/>
            <div className="stage">STAGE</div>
            <div className="first-path"></div>
            <div className="center-stage"></div>
            <div className="second-path"></div>
            <div className="outer-stage"></div>
            <div className="left-pole"></div>
            <div className="right-pole"></div>
            <div className="seating-plan">
                {seatingPlan.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                        <div className="row">
                            {category.zones.map((zone, zoneIndex) => (
                                <div
                                    key={zoneIndex} className={`zone ${selectedZone === zone.zoneId ? "selected" : ""}`}
                                    style={zone.style} onClick={() => selectZone(zone.zoneId)}>
                                        {zone.zoneId}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            <style jsx>{`
                .stage {
                    position: absolute;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    display: flex;
                    height: 5%;
                    width: 34%;
                    left: 33%;
                    margin-top: 1%;
                    border: 1px solid #000000;
                    border-radius: 2px;
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
                    border: 1px solid #b2b2b2;
                    font-size: 12px;
                    border-radius: 2px;
                }
                .selected {
                    background-color: green !important;
                }
                @media (max-width: 768px) {
                    .seating-plan {
                        margin: 10px;
                        padding: 10px;
                    }

                    .zone {
                        font-size: 8px;
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
    )
}
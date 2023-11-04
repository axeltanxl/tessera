import React from "react";

const SeatingPlan = ({setSelectedZone,selectedZone,setSelectedCat,selectedCat,setSelectedPrice,selectedPrice, table}) => {

    var jsonString = table.replace(/'/g, '"');
// Parse the JSON string into a JavaScript object
    var jsonObject = JSON.parse(jsonString);

console.log(jsonObject);

    const seatingPlan = [

        { category: "A", zones: [
            {zoneId: "1", style: { top:"100%",left:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "2", style: { top:"100%",right:"22%",height:"70%",width:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "3", style: { top:"100%",left:"22%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "4", style: { top:"100%",left:"34%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "5", style: { top:"100%",right:"34%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "6", style: { top:"100%",right:"22%",height:"70%",width:"12%",marginTop:"4%",backgroundColor:"#FFDB0E" }},
            {zoneId: "7", style: { top:"100%",left:"22%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "8", style: { top:"100%",left:"34%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "9", style: { top:"100%",right:"34%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "10", style: { top:"100%",right:"22%",height:"70%",width:"12%",marginTop:"8%",backgroundColor:"#FFDB0E" }},
            {zoneId: "11", style: { top:"100%",left:"24%",height:"70%",width:"12%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "12", style: { top:"100%",left:"36%",height:"70%",width:"8%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "13", style: { top:"100%",right:"36%",height:"70%",width:"8%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "14", style: { top:"100%",right:"24%",height:"70%",width:"12%",marginTop:"12%",backgroundColor:"#FFDB0E" }},
            {zoneId: "15", style: { top:"100%",left:"34%",height:"70%",width:"10%",marginTop:"16%",backgroundColor:"#FFDB0E" }},
            {zoneId: "16", style: { top:"100%",right:"34%",height:"70%",width:"10%",marginTop:"16%",backgroundColor:"#FFDB0E" }},
            {zoneId: "17", style: { top:"100%",left:"34%",height:"100%",width:"14%",marginTop:"20%",backgroundColor:"#FFDB0E" }},
            {zoneId: "18", style: { top:"100%",right:"34%",height:"100%",width:"14%",marginTop:"20%",backgroundColor:"#FFDB0E" }},
            {zoneId: "19", style: { top:"100%",left:"30%",height:"100%",width:"12%",marginTop:"25%",backgroundColor:"#FFDB0E" }},
            {zoneId: "20", style: { top:"100%",left:"30%",height:"100%",width:"12%",marginTop:"30%",backgroundColor:"#FFDB0E" }},
            {zoneId: "21", style: { top:"100%",left:"42%",height:"70%",width:"16%",marginTop:"32%",backgroundColor:"#FFDB0E" }},
            {zoneId: "22", style: { top:"100%",right:"30%",height:"100%",width:"12%",marginTop:"25%",backgroundColor:"#FFDB0E" }},
            {zoneId: "23", style: { top:"100%",right:"30%",height:"100%",width:"12%",marginTop:"30%",backgroundColor:"#FFDB0E" }},
        ] },
        { category: "B", zones: [
            {zoneId: "24", style: { top:"100%",left:"25%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "25", style: { top:"100%",left:"35%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "26", style: { top:"100%",left:"45%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "27", style: { top:"100%",right:"35%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "28", style: { top:"100%",right:"25%",height:"100%",width:"10%",marginTop:"36%",backgroundColor:"#68CDFF" }},
            {zoneId: "30", style: { top:"100%",right:"25%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "30", style: { top:"100%",right:"17%",height:"100%",width:"18%",marginTop:"48%",backgroundColor:"#68CDFF" }},
            {zoneId: "29", style: { top:"100%",left:"25%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "29", style: { top:"100%",left:"17%",height:"100%",width:"18%",marginTop:"48%",backgroundColor:"#68CDFF" }},
            {zoneId: "31", style: { top:"100%",left:"40%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
            {zoneId: "32", style: { top:"100%",right:"40%",height:"100%",width:"10%",marginTop:"42%",backgroundColor:"#68CDFF" }},
        ] },
        { category: "C", zones: [
            {zoneId: "63", style: { top:"100%",left:"40%",height:"100%",width:"10%",marginTop:"48%",backgroundColor:"#FF6A68" }},
            {zoneId: "64", style: { top:"100%",right:"40%",height:"100%",width:"10%",marginTop:"48%",backgroundColor:"#FF6A68" }},
            {zoneId: "34", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"18%",backgroundColor:"#FF6A68" }},
            {zoneId: "36", style: { top:"100%",right:"15%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FF6A68" }},
            {zoneId: "37", style: { top:"100%",right:"15%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "38", style: { top:"100%",right:"15%",height:"100%",width:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "42", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"18%",backgroundColor:"#FF6A68" }},
            {zoneId: "41", style: { top:"100%",left:"15%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FF6A68" }},
            {zoneId: "40", style: { top:"100%",left:"15%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FF6A68" }},
            {zoneId: "39", style: { top:"100%",left:"15%",height:"100%",width:"6%",backgroundColor:"#FF6A68" }},
        ] },
        { category: "D", zones: [
            {zoneId: "46", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"42%",backgroundColor:"#68FFAC" }},
            {zoneId: "45", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"36%",backgroundColor:"#68FFAC" }},
            {zoneId: "44", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"30%",backgroundColor:"#68FFAC" }},
            {zoneId: "43", style: { top:"100%",left:"15%",height:"100%",width:"8%",marginTop:"24%",backgroundColor:"#68FFAC" }},
            {zoneId: "31", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"42%",backgroundColor:"#68FFAC" }},
            {zoneId: "32", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"36%",backgroundColor:"#68FFAC" }},
            {zoneId: "33", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"30%",backgroundColor:"#68FFAC" }},
            {zoneId: "34", style: { top:"100%",right:"15%",height:"100%",width:"8%",marginTop:"24%",backgroundColor:"#68FFAC" }},
        ] },
        { category: "E", zones: [
            {zoneId: "47", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"42%",backgroundColor:"#C168FF" }},
            {zoneId: "48", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"36%",backgroundColor:"#C168FF" }},
            {zoneId: "49", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"30%",backgroundColor:"#C168FF" }},
            {zoneId: "50", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"24%",backgroundColor:"#C168FF" }},
            {zoneId: "62", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"42%",backgroundColor:"#C168FF" }},
            {zoneId: "61", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"36%",backgroundColor:"#C168FF" }},
            {zoneId: "60", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"30%",backgroundColor:"#C168FF" }},
            {zoneId: "59", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"24%",backgroundColor:"#C168FF" }},
        ] },
        { category: "F", zones: [
            {zoneId: "58", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"18%",backgroundColor:"#FFAF68"}},
            {zoneId: "57", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FFAF68" }},
            {zoneId: "56", style: { top:"100%",right:"8%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "55", style: { top:"100%",right:"8%",height:"100%",width:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "51", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"18%",backgroundColor:"#FFAF68" }},
            {zoneId: "52", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"12%",backgroundColor:"#FFAF68" }},
            {zoneId: "53", style: { top:"100%",left:"8%",height:"100%",width:"6%",marginTop:"6%",backgroundColor:"#FFAF68" }},
            {zoneId: "54", style: { top:"100%",left:"8%",height:"100%",width:"6%",backgroundColor:"#FFAF68" }},
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
            <h1 className="text-center">Seating Plan</h1><br/>
            <div className="stage">STAGE</div>
            <div className="seating-plan">
                {seatingPlan.map((cat, catIndex) => (
                    <div key={catIndex}>
                        <div className="row">
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
                '

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

    )
}

export default SeatingPlan;
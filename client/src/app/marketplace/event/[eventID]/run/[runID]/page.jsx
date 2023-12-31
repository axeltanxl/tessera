'use client';
import Head from 'next/head';
import { RadioDropdown } from '@/components/ui/RadioDropdown';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import ListingCard from '@/components/ui/cards/ListingCard';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import Modal from '@mui/material/Modal';
import { formatDate, formatTime } from '@/lib/formatUtil';

function MarketplaceListing() {
    const url = usePathname();
    const parts = url.split("/");
    const eventID = parseInt(parts[3]);
    const runID = parseInt(parts[5]);
    const [allListings, setAllListings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [runs, setRuns] = useState([]);
    const [selectedRun, setSelectedRun] = useState(null);
    const token = localStorage.getItem('jwt');
    const [eventName, setEventName] = useState('');
    const [marketplace, setMarketplace] = useState('');
    const [displayImage, setDisplayImage] = useState('');
    useEffect(() => {
        async function fetchTicketListingsByEvent() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events/${eventID}/ticketListings`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const ticketListingData = await res.json();
                    console.log("ticketlistingdata:", ticketListingData);
                    console.log(ticketListingData.filter((item) => item.run.runID === runID));
                    setAllListings(ticketListingData.filter((item) => item.run.runID === runID));
                } else {
                    console.error("API request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        async function fetchCATByEvent() {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events/${eventID}/categories`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const categoriesByEvent = await res.json();
                    setCategories(categoriesByEvent);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        async function fetchRunsByEvent() {
            try {
                console.log("test")
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/events/${eventID}`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const runsByEvent = await res.json();
                    const runDates = runsByEvent.runs.map((item) => formatDate(item.date));
                    setRuns(runDates);
                    setEventName(runsByEvent.name);
                    setDisplayImage(runsByEvent.displayImage);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }

        async function fetchOpenMarketplaces(){
            try{
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BACKEND}/openMarketplaces`, {
                    method: 'GET',
                    headers
                });
                if (res.ok) {
                    const openMarketplaces = await res.json();
                    // console.log("filter:", openMarketplaces.find((item) => item.run.runID === runID));
                    setMarketplace(openMarketplaces.find((item) => item.run.runID === runID));
                } else {
                    console.error("API request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        fetchOpenMarketplaces();
        fetchTicketListingsByEvent();
        fetchCATByEvent();
        fetchRunsByEvent();
    }, [])

    // console.log("all listings:", allListings);

    const priceOptions = ["Low to High", "High to Low"];
    const [sort, setSort] = useState('');
    const [filteredListings, setFilteredListings] = useState([]);

    // const handleDateChange = (selectedRun) => {
    //     setSelectedRun(selectedRun);
    // }

    const handleCategoryChange = (selectedCat) => {
        setSelectedCategory(selectedCat);
    }

    const handlePriceFilterChange = (sortOption) => {
        setSort(sortOption);
    };

    const handleReset = () => {
        setSort('');
        setSelectedRun(null);
        setSelectedCategory(null);
    }

    useEffect(() => {
        let sortedArray = [...allListings];

        if (sort === 'Low to High') {
            sortedArray.sort((a, b) => a.ticketListing.price - b.ticketListing.price);
        } else if (sort === 'High to Low') {
            sortedArray.sort((a, b) => b.ticketListing.price - a.ticketListing.price);
        }
        if (selectedCategory !== null) {
            sortedArray = sortedArray.filter((item) => item.seat.category === selectedCategory);
        }
        // if (selectedRun != null) {
        //     sortedArray = sortedArray.filter((item) => formatDate(item.run.date) === selectedRun);
        // }
        // Update the filteredListings state with the sorted array
        setFilteredListings(sortedArray);
    }, [sort, allListings, selectedCategory]);

    //countdown timer
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');
    // console.log("marketplace closing date:", marketplace.closingDate);
    const closingDate = marketplace?.closingDate !== undefined ? marketplace.closingDate : '1 January 2023';
    let interval = useRef();
    const startTimer = () => {
        const countdownDate = new Date(`${closingDate} 00:00:00`).getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24)); // 1000 miliseconds * 60 seconds * 60 minutes * 24 hours
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(distance % (1000 * 60) / 1000);

            if (distance < 0) {
                //stop timer
                clearInterval(interval.current);
            } else {
                //update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };
    //componentDidMount
    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    });

    //modal 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <section className="bg-primary h-full">
            <Head>
                <title>Tessera - Marketplace</title>
            </Head>
            <div className="flex flex-col md:mx-2 xl:mx-20">
                <p className="text-xl mb-4 mt-10 font-semibold">Marketplace</p>
            </div>
            <div className="bg-cover bg-center bg-[url('/gradient.png')]  h-[284px] flex items-center p-10">
                <img src={displayImage === '' ? 'grey-temp.jpg' : displayImage} className='h-[230px]' />
                <div className="items-start flex flex-col flex-1 p-16">
                    <p className='text-2xl'>{eventName} on {formatDate(marketplace?.run?.date)}, {formatTime(marketplace?.run?.startTime)} to {formatTime(marketplace?.run?.endTime)}</p>
                    <p className='mb-2'>Ticket marketplace closing in</p>
                    <div className='grid grid-cols-7 grid-rows-1 gap-x-1 gap-y-1'>
                        <p className='text-center'>Days</p>
                        <p></p>
                        <p className='text-center'>Hours</p>
                        <p></p>
                        <p className='text-center'>Minutes</p>
                        <p></p>
                        <p className='text-center'>Seconds</p>
                        <p className='text-5xl text-center'>{timerDays}</p>
                        <p></p>
                        <p className='text-5xl text-center'>{timerHours}</p>
                        <p className='text-center'>:</p>
                        <p className='text-5xl text-center'>{timerMinutes}</p>
                        <p className='text-center'>:</p>
                        <p className='text-5xl text-center'>{timerSeconds}</p>
                    </div>
                </div>
            </div>
            <div className='px-20 py-8 flex justify-between'>
                <div className='flex'>
                    {/* <div className='mr-2 xs:mr-4'>
                        <RadioDropdown name={"Date"} dropdownItems={runs} defaultValue={"Date"} handleChange={handleDateChange} />
                    </div> */}
                    <div className='mx-2 xs:mr-4'>
                        <RadioDropdown name={"CAT"} dropdownItems={categories} defaultValue={"CAT"} handleChange={handleCategoryChange} />
                    </div>
                    <div className='mx-2 xs:mr-4'>
                        <RadioDropdown name={"Price"} dropdownItems={priceOptions} defaultValue={"Price"} handleChange={handlePriceFilterChange} />
                    </div>
                    <button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground px-4 py-2 rounded-full border-[#B4C1DB] h-8 hover:bg-[#F5F7FB] w-30'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                <button onClick={handleOpen} className="bg-black text-white text-sm px-2 rounded-lg">View seat map</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] bg-white rounded-sm'>
                        <div className='flex justify-center items-center h-full'>
                            <img src="/images/stadiumSeating.webp"/>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className='px-20'>
                {filteredListings.length > 0 ? (<div className='grid grid-cols-4 gap-4'>
                    {filteredListings.map((item, index) => <ListingCard item={item} key={index} />)}
                </div>) : ("No tickets listed on Marketplace under your selected filters yet. Stay tuned!")}

            </div>
        </section>)
}

export default MarketplaceListing;
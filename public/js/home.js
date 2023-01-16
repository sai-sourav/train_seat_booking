const rows = document.getElementsByClassName('seatrow');
const bookseats = document.getElementById('bookseat');
const message = document.getElementById("message");

const URL = "http://3.83.176.16:4000";

window.addEventListener("DOMContentLoaded", ()=>{
    SeatStructure();
    localStorage.removeItem('bookedseats');
    getavailability(0);
})

bookseats.addEventListener('click', async (e) => {
    e.preventDefault();
    const seatcount = document.getElementById('seats').value;
    message.innerText = "";
    try{
        const response = await axios.post(`${URL}/bookseats`, {
            count : seatcount
        })
        let bookedseats = localStorage.getItem('bookedseats')
        if(bookedseats === null){
            bookedseats = []
        }
        else{
            bookedseats = JSON.parse(bookedseats);
        }
        if(bookedseats.length > 0){
            getavailability(bookedseats[bookedseats.length-1].seatid);
        }else{
            getavailability(0);
        }
        
    }catch(err){
        if(err.response.status === 404){
            message.innerText = "❌ Seats booked, please select less seats";
        }else{
            console.log(err);
        }
    }
})

async function getavailability(lastbookedid){
    try{
        let response = await axios.get(`${URL}/getavailability?id=${lastbookedid}`)
        response = response.data.seats;
        console.log(response.length);
        let bookedseats = localStorage.getItem('bookedseats');
        if(bookedseats === null){
            bookedseats = []
        }
        else{
            bookedseats = JSON.parse(bookedseats);
        }
        const stringify1 = JSON.stringify(bookedseats.concat(response))
        localStorage.setItem('bookedseats', stringify1);
        showavailability();
    }catch(err){
        console.log(err);
    } 
}

function showavailability(){
    let stringdata = localStorage.getItem("bookedseats");
    let seatsbooked = JSON.parse(stringdata);
    if(seatsbooked === null){
        seatsbooked = []
    }
    for(let i=0 ; i<seatsbooked.length ; i++){
        let seatid = `s${seatsbooked[i].seatid}`;
        const seat = document.getElementById(seatid);
        seat.classList.add('booked');
    }
}

function SeatStructure(){
    var count = 1;
    for(let i=0; i<rows.length; i++){
        let rowid = rows[i].id;
        const row = document.getElementById(rowid);
        let rowno = parseInt(rowid.match(/(\d+)/)[0]);
        if(rowno % 2 === 1 && rowno !== 12){
            for(let j=1; j<=7; j++){
                const seat = document.createElement('div');
                seat.id = `s${count}`;
                seat.className = `seat${j}`;
                seat.innerText = `${count}`;
                row.appendChild(seat);
                count = count + 1;
            }
        }else{
            if(rowno === 12){
                for(let j=3; j<=5; j++){
                    const seat = document.createElement('div');
                    seat.id = `s${count}`;
                    seat.className = `seat${j}`;
                    seat.innerText = `${count}`;
                    row.appendChild(seat);
                    count = count + 1;
                }
            }
            else{
                for(let j=7; j>0; j--){
                    const seat = document.createElement('div');
                    seat.id = `s${count}`;
                    seat.className = `seat${j}`;
                    seat.innerText = `${count}`;
                    row.appendChild(seat);
                    count = count + 1;
                }
            }
            
        }
    }
}
